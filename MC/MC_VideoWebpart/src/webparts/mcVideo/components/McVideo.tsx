import * as React from 'react';
import styles from './McVideo.module.scss';
import { IMcVideoProps } from './IMcVideoProps';
import * as jquery from 'jquery'; 
import { IMCVideoState } from './IMCVideoState';
import { escape } from '@microsoft/sp-lodash-subset';
import ImageGallery from 'react-image-gallery'; 
import { IGetListItem } from './IGetListItem';
import './image-gallery.css';

export default class McVideo extends React.Component<IMcVideoProps, IMCVideoState> {
  constructor(props: IMcVideoProps, state: IMCVideoState) {
    super(props);
 
    this.state = {
       items: [],
       showFullscreenButton: true,
       showGalleryFullscreenButton: true,
       showPlayButton: true,
       showGalleryPlayButton: true,
       slideInterval: 2000,
       showVideo: {}
    };
  }
  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
}

_onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
}

_onPause(index) {
    console.debug('paused on index', index);
}

_onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
}

_onPlay(index) {
    console.debug('playing from index', index);
}

_handleInputChange(state, event) {
    this.setState({ [state]: event.target.value });
}

_handleCheckboxChange(state, event) {
    this.setState({ [state]: event.target.checked });
}



_getStaticImages() {
    let images = [];
    for (let i = 2; i < 12; i++) {
        images.push({
            original: `s.jpg`,
            thumbnail: `t.jpg`
        });
    }

    return images;
}

_resetVideo() {
    this.setState({ showVideo: {} });

    if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: true });
    }

    if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: true });
    }
}

_toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
        showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
        if (this.state.showPlayButton) {
            this.setState({ showGalleryPlayButton: false });
        }

        if (this.state.showFullscreenButton) {
            this.setState({ showGalleryFullscreenButton: false });
        }
    }
}

_renderVideo(item) {
    return (
        <div className='image-gallery-image'>
            {
                this.state.showVideo[item.embedUrl] ?
                    <div className='video-wrapper'>
                        <a
                            className='close-video'
                            onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                        >
                        </a>
                        <iframe
                            width='100%'
                            height='315'
                            src={item.embedUrl}
                            frameBorder='0'
                            allowFullScreen
                        >
                        </iframe>
                    </div>
                    :
                    <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
                        <div className='play-button'></div>
                        <img src={item.original} />
                        {
                            item.description &&
                            <span
                                className='image-gallery-description'
                                style={{ right: '0', left: 'initial' }}
                            >
                                {item.description}
                            </span>
                        }
                    </a>
            }
        </div>
    );
}

  public componentDidMount() {
    this.readItems();
   }
  public render(): React.ReactElement<IMcVideoProps> {
    var VideoList=[];
    this.state.items.map((item: IGetListItem, i: number) => {
      var oVideoURL = item.FileRef;
      var desc= item.Title;
      var varname = {thumbnail: `https://abemc.sharepoint.com/sites/Dev/MyPics/mc-news-landing-layout.png`,
      original: `https://abemc.sharepoint.com/sites/Dev/MyPics/mc-news-landing-layout.png`,
      originalClass: 'featured-slide',
      thumbnailClass: 'featured-thumb',
      embedUrl:oVideoURL,
      description: desc,
      renderItem: this._renderVideo.bind(this)
};
      VideoList.push(varname);
        });
      return (
          <div>
            <h3>Video Component</h3>
            <ImageGallery
                items={VideoList}
                slideInterval={2000}
                autoPlay={false}
                showGalleryPlayButton={true}
                onSlide={this._onSlide.bind(this)}
                onPause={this._onPause.bind(this)}
                onScreenChange={this._onScreenChange.bind(this)}
                onPlay={this._onPlay.bind(this)}
                showFullscreenButton={false} />

          </div>
    );
  }
  private readItems(): void {
    
        var reactHandler = this;    
        jquery.ajax({    
         url: `${this.props.siteUrl}/_api/web/lists/getbytitle('Documents')/items?$select=FileRef/FileRef,Title`,    
         type: "GET",    
         headers:{'Accept': 'application/json; odata=verbose;'},    
         success: function(resultData) {    
           reactHandler.setState({    
             items: resultData.d.results   
           });
         },    
         error : function(jqXHR, textStatus, errorThrown) {  
           this.setState({
                  items: []
           });
         }
     });    
       
   }
   
}

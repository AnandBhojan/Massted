import * as React from 'react';
import styles from './ImageRotator.module.scss';
import { ImageRotatorProps } from './ImageRotatorProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery'; 
import { IGetListItem } from './IGetListItem';
import { ImageRotatorState } from './ImageRotatorState';
import ImageGallery from 'react-image-gallery'; 
import './image-gallery.css';

export default class ImageRotator extends React.Component<ImageRotatorProps,ImageRotatorState > {
  constructor(props: ImageRotatorProps, state: ImageRotatorState) {
    super(props);
 
    this.state = {
       items: []
    };
  }
  public componentDidMount() {
  this.readItems();
 
 }

  public render(): React.ReactElement<ImageRotatorProps> {
    var varname=[];  var Count =0;
    if(this.props.description=="Scenes")
    {
     this.state.items.map((item: IGetListItem, i: number) => {
      var imageurl = item.FileRef;
      var desc= item.Description;
      var varname1 = {'original':imageurl,'thumbnail': imageurl,'description': desc };
      Count = Count + 1;
      varname.push(varname1);
        });
      return (
          <div>
            <h1> Scenes Around Mastercard</h1>
            <ImageGallery
                    items={varname}
                    slideInterval={1800}
                    autoPlay={true}
                    showPlayButton={false}
                    showFullscreenButton={false} />  
          </div>
    );
  }
//   else if(this.props.description=="Slider")
//   {
//    this.state.items.map((item: IGetListItem, i: number) => {
//     var imageurl = item.FileRef;
//     var desc= item.Description;
//     var varname1 = {'original':imageurl,'thumbnail': imageurl,'thumbnailLabel': desc };
//     Count = Count + 1;
//     varname.push(varname1);
//       });
//     return (
//         <div>
//           <h1> Top Slider</h1>
         
//                   <div className="topcarousel-leftnav">
//                     <ImageGallery
//                       items={varname}
//                       slideInterval={2000}
//                       autoPlay={true}
//                       showPlayButton={false}
//                       showFullscreenButton={false}
//                       thumbnailPosition="right" />
//                   </div> 
//         </div>
//   );
// }
else 
{
 this.state.items.map((item: IGetListItem, i: number) => {
  var imageurl = item.FileRef;
  var desc= item.Description;
  var varname1 = {'original':imageurl,'thumbnail': imageurl,'description': desc };
  Count = Count + 1;
  varname.push(varname1);
    });
  return (
      <div>
        <h1>Bill Board </h1>
       
        <ImageGallery
        items={varname}
        slideInterval={1600}
        autoPlay={true}
        showPlayButton={false}
        showThumbnails={false}
        showFullscreenButton={false} />

      </div>
);
}
    
  }
  private readItems(): void {
   
       var reactHandler = this;    
       jquery.ajax({    
        url: `${this.props.siteUrl}/_api/web/lists/getbytitle('MasterCardImages')/items?$select=FileRef/FileRef,Description`,    
        type: "GET",    
        headers:{'Accept': 'application/json; odata=verbose;'},    
        success: function(resultData) {    
          reactHandler.setState({    
            items: resultData.d.results   
          });
        },    
        error : function(jqXHR, textStatus, errorThrown) {  
          this.setState({
            status: 'Loading all items failed with error: ' ,
            items: []  
          });
        }
    });    
      
  }
}

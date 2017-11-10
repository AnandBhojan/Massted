import * as React from 'react';
import * as jquery from 'jquery';  
import styles1 from './TopNews.module.scss';
import { ITopNewsProps } from './ITopNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IGetListItem } from './IGetListItem';
import { ITopNewsState } from './ITopNewsState';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import ImageGallery from 'react-image-gallery'; 
import './image-gallery.css';

export default class ReactGetItems extends React.Component<ITopNewsProps,ITopNewsState > {
    constructor(props: ITopNewsProps, state: ITopNewsState) {
      super(props);
      this.state = {
             items: []
      };
    }

    public componentDidMount() {
      this.readItems();
   }

    public render(): React.ReactElement<ITopNewsProps> {
      var ImageList=[];
      this.state.items.map((primaryQueryResult: IGetListItem, i: number) => {
        
          if (primaryQueryResult != null && primaryQueryResult != undefined) {  
            var desc=primaryQueryResult["Cells"].results[2].Value
            var imageurl=primaryQueryResult["Cells"].results[3].Value
            var varname1 = {'original':imageurl,'thumbnail': imageurl,'thumbnailLabel': desc };
            ImageList.push(varname1);
          }  
      
    });
    return (
      <div>
      <h1> Scenes Around Mastercard</h1>
      <div className="topcarousel-leftnav">
      <ImageGallery
        items={ImageList}
        slideInterval={2000}
        autoPlay={true}
        showPlayButton={false}
        showFullscreenButton={false}
        thumbnailPosition="right" />
    </div> 
    </div>
    );
  }


   private readItems(): void {
    var reactHandler = this;    
    jquery.ajax({    
        url: `${this.props.siteUrl}/_api/search/query?querytext='ContentType:LocallNews'&$top 5&selectproperties='NewsCommentsOWSMTXT,PageImageOWSURLH'`,    
        type: "GET",    
        headers:{'Accept': 'application/json; odata=verbose;'},    
        success: function(resultData) {   
          var primaryQueryResult = resultData.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;  
          reactHandler.setState({    
            items : primaryQueryResult
          });    
        },    
        error : function(jqXHR, textStatus, errorThrown) {    
        }    
    });    
    
  }
 
}

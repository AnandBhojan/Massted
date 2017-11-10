import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'McVideoWebPartStrings';
import McVideo from './components/McVideo';
import { IMcVideoProps } from './components/IMcVideoProps';
import { IMcVideoWebPartProps } from './IMcVideoWebPartProps';

export default class McVideoWebPart extends BaseClientSideWebPart<IMcVideoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMcVideoProps > = React.createElement(
      McVideo,
      {
        description: this.properties.description,
        siteUrl: this.context.pageContext.web.absoluteUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('Autoplay', {
                  label:"Autoplay"
                })
              ]
              
            }
          ]
        }
      ]
    };
  }
}

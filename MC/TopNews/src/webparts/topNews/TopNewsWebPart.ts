import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TopNewsWebPartStrings';
import TopNews from './components/TopNews';
import { ITopNewsProps } from './components/ITopNewsProps';
import { ITopNewsWebPartProps } from './ITopNewsWebPartProps';

export default class TopNewsWebPart extends BaseClientSideWebPart<ITopNewsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITopNewsProps > = React.createElement(
      TopNews,
      {
        siteUrl: this.context.pageContext.web.absoluteUrl,
        listName: this.properties.description
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

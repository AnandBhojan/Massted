import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ImageRotatorWebPartStrings';
import ImageRotator from './components/ImageRotator';
import { ImageRotatorProps } from './components/ImageRotatorProps';
import { IImageRotatorWebPartProps } from './IImageRotatorWebPartProps';

export default class ImageRotatorWebPart extends BaseClientSideWebPart<IImageRotatorWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ImageRotatorProps > = React.createElement(
      ImageRotator,
      {
        description: this.properties.description,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        Autoplay : this.properties.AutoPlay
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

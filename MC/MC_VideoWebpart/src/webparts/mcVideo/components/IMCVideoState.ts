import { IGetListItem } from './IGetListItem';
export interface IMCVideoState
{
    items: IGetListItem[];
    showFullscreenButton: boolean;
    showGalleryFullscreenButton: boolean;
    showPlayButton: boolean;
    showGalleryPlayButton: boolean;
    slideInterval: number;
    showVideo: {};
}
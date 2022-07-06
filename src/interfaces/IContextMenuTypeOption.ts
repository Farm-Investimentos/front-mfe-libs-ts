import { IContextMenuOptionIcon } from './IContextMenuOptionIcon';

export interface IContextMenuOption {
	label: string;
	handler: string;
	icon: IContextMenuOptionIcon;
}

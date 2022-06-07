import { IContextMenuOptionIcon } from './IContextMenuOptionIcon';

export type IContextMenuOption = {
	label: string;
	handler: string;
	icon: IContextMenuOptionIcon;
};

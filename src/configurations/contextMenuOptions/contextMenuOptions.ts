import { IContextMenuOption } from '../../interfaces/IContextMenuTypeOption';

export const details: IContextMenuOption = {
	label: 'Ver',
	handler: 'details',
	icon: { color: 'secondary', type: 'open-in-new' },
};

export const edit: IContextMenuOption = {
	label: 'Editar',
	handler: 'edit',
	icon: { color: 'secondary', type: 'square-edit-outline' },
};

export const invite: IContextMenuOption = {
	label: 'Convidar',
	handler: 'invite',
	icon: { color: 'secondary', type: 'email' },
};

export const historic: IContextMenuOption = {
	label: 'Histórico',
	handler: 'historic',
	icon: { color: 'grey', type: 'history' },
};

export const remove: IContextMenuOption = {
	label: 'Excluir',
	handler: 'remove',
	icon: { color: 'error', type: 'trash-can' },
};

export const download: IContextMenuOption = {
	label: 'Baixar Documento',
	handler: 'download',
	icon: { color: 'secondary', type: 'download' },
};

export const approve: IContextMenuOption = {
	label: 'Analisar Documento',
	handler: 'approve',
	icon: { color: 'secondary', type: 'check-circle' },
};

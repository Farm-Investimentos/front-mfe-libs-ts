import { IContextMenuOption } from '../../interfaces/IContextMenuTypeOption';

export const details: IContextMenuOption = {
	label: 'Ver',
	handler: 'details',
	icon: { type: 'open-in-new' },
};

export const edit: IContextMenuOption = {
	label: 'Editar',
	handler: 'edit',
	icon: { type: 'pencil-outline' },
};

export const invite: IContextMenuOption = {
	label: 'Convidar',
	handler: 'invite',
	icon: { type: 'email' },
};

export const historic: IContextMenuOption = {
	label: 'Histórico',
	handler: 'historic',
	icon: { color: 'gray', type: 'history' },
};

export const remove: IContextMenuOption = {
	label: 'Excluir',
	handler: 'remove',
	icon: { color: 'error', type: 'delete-outline' },
};

export const download: IContextMenuOption = {
	label: 'Baixar Documento',
	handler: 'download',
	icon: { type: 'download' },
};

export const approve: IContextMenuOption = {
	label: 'Analisar Documento',
	handler: 'approve',
	icon: { type: 'check-circle' },
};

export const finalizeAssociation: IContextMenuOption = {
	label: 'Finalizar Associação',
	handler: 'finalizeAssociation',
	icon: { color: 'error', type: 'close-circle-outline' },
};

export const reAssociate: IContextMenuOption = {
	label: 'Associar Novamente',
	handler: 'reAssociate',
	icon: { type: 'reload' },
};

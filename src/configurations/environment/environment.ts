import ICognitoConfig from 'interfaces/ICognitoConfig';

const _window: any = window;
const FARM = _window['FARM'] || {};

FARM.APIS = FARM.APIS || {};

export default {
	get apiRevendaUrl(): string {
		return FARM.APIS.revenda;
	},
	get apiConfigUrl(): string {
		return FARM.APIS.config;
	},
	get apiDashboardUrl(): string {
		return FARM.APIS.dashboard;
	},
	get apiExcelUrl(): string {
		return FARM.APIS.excel;
	},
	get apiZipCodeUrl(): string {
		return FARM.APIS.cep;
	},
	get onboardingApiUrl(): string {
		return FARM.APIS.onboarding;
	},
	get apiCadastrosUrlV2(): string {
		return FARM.APIS.cadastrosV2;
	},
	get apiCadastrosUrlV3(): string {
		return FARM.APIS.cadastrosV3;
	},
	get apiCadastrosUrl(): string {
		return FARM.APIS.cadastros;
	},
	get apiOperacoesUrl(): string {
		return FARM.APIS.operacoes;
	},
	get apiCreditoUrl(): string {
		return FARM.APIS.credito;
	},
	get apiFormalizacaosUrl(): string {
		return FARM.APIS.formalizacao;
	},
	get apiOperacoesNotasUrl(): string {
		return FARM.APIS.notas;
	},

	get apiSegurancaUrl(): string {
		return FARM.APIS.seguranca;
	},

	get apiDesembolsosUrl(): string {
		return FARM.APIS.desembolsos;
	},

	get apiCreditoSolicitacaoLimiteUrl(): string {
		return FARM.APIS.creditoSolicitacaoLimite;
	},

	get apiCreditoGestaoLimiteUrl(): string {
		return FARM.APIS.creditoGestaoLimite;
	},

	get apiAgentesCobranca(): string {
		return FARM.APIS.agentesCobranca;
	},

	get apiBlipKey(): string {
		return FARM.BLIP;
	},
	get analyticsId(): string {
		return FARM.GA_ID;
	},

	get cognito(): ICognitoConfig {
		return {
			userPoolId: FARM.COGNITO.USERPOOL_ID,
			clientId: FARM.COGNITO.CLIENT_ID,
		};
	},
};

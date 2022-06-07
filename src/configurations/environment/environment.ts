import ICognitoConfig from 'interfaces/ICognitoConfig';

const FARM = window['FARM'] || {};

FARM.APIS = FARM.APIS || {};

export default {
	get apiRevendaUrl(): string {
		return FARM.APIS.revenda;
	},
	get apiConfigUrl(): string {
		return FARM.APIS.config;
	},
	get apiDashboardUrl() {
		return FARM.APIS.dashboard;
	},
	get apiExcelUrl(): string {
		return FARM.APIS.excel;
	},
	get apiZipCodeUrl() {
		return FARM.APIS.cep;
	},
	get onboardingApiUrl() {
		return FARM.APIS.onboarding;
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

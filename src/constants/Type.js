class Type {
	static get DATA_LOAD() {
		return {
			ONCE: 'Type.DATA_LOAD.ONCE',
			ALWAYS: 'Type.DATA_LOAD.ALWAYS',
			ALREADY: 'Type.DATA_LOAD.ALREADY',
		};
	}
	static get COMPONENT() {
		return {
			ALERT_DRAWER: 'alertDrawer',
			CONFIRM_DRAWER: 'confirmDrawer',
			BANK_LIST_DRAWER: 'bankListDrawer',
			BANK_LIST_TAB_DRAWER: 'bankListTabDrawer',
			ACCOUNT_LIST_DRAWER: 'accountListDrawer',
			ACCOUNT_LIST_TAB_DRAWER: 'accountListTabDrawer',
			SHARE_SNS_DRAWER: 'shareSNSDrawer',
		};
	}
}

export default Type;

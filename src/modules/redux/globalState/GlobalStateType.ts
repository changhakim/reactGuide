export type Page = {
	isPageScrollTop: boolean;
};

export type FullPopup = {
	isFullPopupScrollTop: boolean;
};

export default interface GlobalStateType {
	page: Page;
	fullPopup: FullPopup;
}

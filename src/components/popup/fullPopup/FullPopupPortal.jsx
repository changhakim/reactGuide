import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { FullPopup } from '@components';

export const FullPopupPortal = () => {
	const { popupList } = useSelector((state) => ({
		popupList: state.modal.fullPopup,
	}));

	return (
		<>
			{popupList &&
				Object.keys(popupList).length > 0 &&
				Object.keys(popupList).map((key, index) =>
					ReactDOM.createPortal(
						<FullPopup key={`fullPopCreate${index}`} popupId={key} />,
						document.body,
					),
				)}
		</>
	);
};

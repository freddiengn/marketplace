import React from 'react';
import { Modal } from 'antd';

const SuccessModal = ({ show, onHide, message }) => {
    return (
        <Modal
            title="Success"
            visible={show}
            onCancel={onHide}
            footer={[
                <button key="close" onClick={onHide} className="ant-btn ant-btn-default">
                    Close
                </button>,
            ]}
        >
            <p>{message}</p>
        </Modal>
    );
};

export default SuccessModal;
// @ts-nocheck
// how to invoke 

/*


<Button onClick={() => showInfoModal('This is a notification message', (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ))}>

//to invoke automatic without button click 
// call without button 

showErrorModal('This is a notification message', (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ))



*/



// modalUtils.ts
import { Modal } from 'antd';

export const showInfoModal = (title, content, onOk ) => {
  Modal.info({
    title,
    content,
    onOk: onOk || (() => {}),
  });
};

export const showSuccessModal = (content,) => {
  Modal.success({
    content,
    onOk: onOk || (() => {}),
  });
};

export const showErrorModal = (title, content, onOk) => {
  Modal.error({
    title,
    content,
    onOk: onOk || (() => {}),
  });
};

export const showWarningModal = (title, content, onOk) => {
  Modal.warning({
    title,
    content,
    onOk: onOk || (() => {}),
  });
};

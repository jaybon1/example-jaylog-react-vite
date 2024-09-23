import {useRef} from "react";
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import {useAuthStore} from "/src/store/provider/StoreProvider.jsx";
import PropTypes from "prop-types";

CheckUserModal.propTypes = {
    modalShow: PropTypes.bool.isRequired,
    modalClose: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired,
}

const CheckUserModal = ({modalShow, modalClose, callback}) => {

    const pwInputRef = useRef(null);


    const authStore = useAuthStore();

    const validateFields = () => {
        if (pwInputRef.current.value === "") {
            alert("비밀번호를 입력해주세요.");
            pwInputRef.current.focus();
            return false;
        }

        return true;
    };

    const [requestCheckUser, isPending] = usePendingFunction(async () => {
        if (!validateFields()) {
            return;
        }

        const checkUser = {
            username: authStore.loginUser.username,
            password: pwInputRef.current.value,
        };

        await fetch(`/v1/auth/login`, {
            method: `post`,
            body: JSON.stringify(checkUser),
        }).then((response) => {
            if (response?.status === 200) {
                modalClose();
                callback();
            }
        });
    });

    const enterKeyCheckUser = (event) => {
        if (event.keyCode === 13) {
            requestCheckUser();
        }
    };

    return (
        <Modal
            show={modalShow}
            onHide={modalClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>본인 확인</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Text>비밀번호</InputGroup.Text>
                    <Form.Control
                        ref={pwInputRef}
                        type="password"
                        onKeyUp={enterKeyCheckUser}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={modalClose}>
                    취소
                </Button>
                <Button
                    variant="primary"
                    onClick={requestCheckUser}
                    disabled={isPending}
                >
                    체크
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CheckUserModal;

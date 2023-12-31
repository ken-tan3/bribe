import { useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Avatar, Popover, Button, Modal, Text } from "@nextui-org/react";
import { FaEllipsisH } from "react-icons/fa";

import sendData from "utils/sendData";

const BribeItemEllipsisButton = ({ sessionUserId, bribeUserId, bribeId }) => {
  const router = useRouter();
  const id = router.query.id;
  const editUrl = `/bribes/${id}/edit`;
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClick = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  };

  const onDeleteButtonClick = (e) => {
    e.preventDefault();
    const body = {
      id: bribeId,
    };
    sendData("DELETE", "/api/bribes", body).then(() => router.push("/"));
  };

  if (sessionUserId == bribeUserId) {
    return (
      <>
        <Popover isOpen={isOpen}>
          <Popover.Trigger>
            <Avatar
              icon={<FaEllipsisH />}
              pointer
              css={{
                color: "$primaryLight",
              }}
              //@ts-ignore
              color="$white"
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </Popover.Trigger>
          <Popover.Content>
            <Button.Group
              vertical
              css={{
                m: 0,
              }}
            >
              <NextLink href={editUrl}>
                <Button
                  size="xs"
                  css={{
                    background: "$white",
                    color: "$primaryLight",
                    "&:hover": {
                      backgroundColor: "$primary",
                      color: "$white",
                    },
                  }}
                >
                  Edit
                </Button>
              </NextLink>
              <Button
                size="xs"
                css={{
                  background: "$white",
                  color: "$primaryLight",
                  "&:hover": {
                    backgroundColor: "$primary",
                    color: "$white",
                  },
                }}
                onClick={onClick}
              >
                Delete
              </Button>
            </Button.Group>
          </Popover.Content>
        </Popover>
        <Modal
          aria-labelledby="modal-title"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          width="320px"
        >
          <Modal.Header>
            <Text id="modal-title">Delete This Post</Text>
          </Modal.Header>
          <Modal.Body>
            <Text id="modal-body" small>
              * This cannot be undone!
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="xs"
              flat
              color="error"
              onClick={() => setIsModalOpen(false)}
            >
              CANCEL
            </Button>
            <Button
              color="warning"
              flat
              size="xs"
              onClick={onDeleteButtonClick}
            >
              DELETE
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  return <></>;
};

export default BribeItemEllipsisButton;

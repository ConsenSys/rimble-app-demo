import React from "react";
import { Card, Heading, Text, Flex, Button, Icon, Modal } from "rimble-ui";

class UserRejectedValidationModal extends React.Component {
  sendMessageAgain = event => {
    this.props.closeModal();
    this.props.validateAccount();
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={[3, 5]} maxWidth={"600px"}>
          <Flex justifyContent={"flex-end"} mr={[-3, -5]} mt={[-3, -5]}>
            <Button.Text
              icononly
              icon={"Close"}
              color={"moon-gray"}
              onClick={this.props.closeModal}
            />
          </Flex>

          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Flex justifyContent={"center"} my={4}>
              <Icon name="Warning" color="gold" size="40" />
            </Flex>

            <Heading.h2 my={3}>
              You can't continue without signing the message
            </Heading.h2>

            <Text my={4}>
              To use our blockchain features, sign the message to finish
              connecting.
            </Text>

            <Flex justifyContent={"flex-end"} mt={4}>
              <Button.Outline onClick={this.props.closeModal} mr={4}>
                Cancel connection
              </Button.Outline>
              <Button onClick={this.sendMessageAgain}>Try again</Button>
            </Flex>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default UserRejectedValidationModal;

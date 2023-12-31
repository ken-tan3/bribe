import { Popover, Button, Text, Grid } from "@nextui-org/react";

export type placement = {
  bottom: "bottom";
  top: "top";
  left: "left";
  right: "right";
  bottomLeft: "bottom-left";
  bottomRight: "bottom-right";
  topLeft: "top-left";
  topRight: "top-right";
  leftTop: "left-top";
  leftBottom: "left-bottom";
  rightTop: "right-top";
  rightBottom: "right-bottom";
};

const PopoverItem = ({ placement: placement, buttonIcon }) => {
  return (
    <Popover placement={placement}>
      <Popover.Trigger>
        <Button
          auto
          bordered
          css={{
            color: "$primaryLight",
            borderColor: "$primaryLight",
            // display: "none",
          }}
          size="xs"
        >
          {buttonIcon}
          Global
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Text css={{ p: "$10" }}>Comming Soon!</Text>
      </Popover.Content>
    </Popover>
  );
};

export default PopoverItem;

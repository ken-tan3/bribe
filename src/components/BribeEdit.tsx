import { useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  Grid,
  Input,
  Textarea,
  Spacer,
  Popover,
  Button,
  Text,
  useInput,
} from "@nextui-org/react";

import { FiPenTool } from "react-icons/fi";
import { CgOrganisation, CgNotes } from "react-icons/cg";
import { BiTime, BiCoin } from "react-icons/bi";
import { GiPresent } from "react-icons/gi";
import { MdKeyboardArrowDown } from "react-icons/md";

import sendData from "utils/sendData";
import BribeEditGoogleMap from "components/BribeEditGoogleMap";
import BribeEditGoogleMapInput from "components/BribeEditGoogleMapInput";

const BribeEdit = ({ isNew, bribeId, userId, bribeData }) => {
  // get current page path parameter
  const router = useRouter();
  const id = router.query.id;
  const redirectUrl = `/bribes/${id}`;

  const [what, setWhat] = useState<string>(bribeData ? bribeData.what : "");
  const [who, setWho] = useState<string>(bribeData ? bribeData.who : "");

  // googlemap
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [isGoogleMapInputValid, setIsGoogleMapInputValid] =
    useState<boolean>(true);
  const { value, setValue, reset, bindings } = useInput(
    bribeData && bribeData.googleMapAddress ? bribeData.googleMapAddress : ""
  );
  const [googleMapLatLng, setGoogleMapLatLng] = useState(
    bribeData
      ? {
          lat: bribeData.googleMapLatitude,
          lng: bribeData.googleMapLongitude,
        }
      : {
          lat: null,
          lng: null,
        }
  );

  const [when, setWhen] = useState<string>(
    bribeData && bribeData.when ? bribeData.when.substring(0, 10) : ""
  );
  const [goods, setGoods] = useState<string>(bribeData ? bribeData.goods : "");
  const [howMuch, setHowMuch] = useState<string>(
    bribeData ? bribeData.howMuch : ""
  );
  const [howMuchIsoCode, setHowMuchIsoCode] = useState<string>(
    bribeData ? bribeData.howMuchIsoCode : "USD"
  );
  const [note, setNote] = useState<string>(bribeData ? bribeData.note : "");

  const submitData = (e) => {
    e.preventDefault();
    if (isNew) {
      const body = {
        id: bribeId,
        what: what,
        who: who,
        googleMapAddress: value,
        googleMapLatitude: googleMapLatLng.lat ?? googleMapLatLng.lat,
        googleMapLongitude: googleMapLatLng.lng ?? googleMapLatLng.lng,
        when: new Date(when),
        goods: goods,
        howMuch: parseInt(howMuch),
        howMuchIsoCode: howMuchIsoCode,
        note: note,
        userId: userId,
      };
      sendData("POST", "/api/bribes", body).then(() =>
        router.push(redirectUrl)
      );
      return;
    }
    const body = {
      id: bribeId,
      what: what,
      who: who,
      googleMapAddress: value,
      googleMapLatitude: googleMapLatLng.lat ?? googleMapLatLng.lat,
      googleMapLongitude: googleMapLatLng.lng ?? googleMapLatLng.lng,
      when: new Date(when),
      goods: goods,
      howMuch: parseInt(howMuch),
      howMuchIsoCode: howMuchIsoCode,
      note: note,
    };
    sendData("PUT", "/api/bribes", body).then(() => router.push(redirectUrl));
    return;
  };

  const cancelUrl = () => {
    if (isNew) {
      return "/";
    }
    return redirectUrl;
  };

  return (
    <>
      <BribeEditGoogleMap
        map={map}
        setMap={setMap}
        maps={maps}
        setMaps={setMaps}
        geocoder={geocoder}
        setGeocoder={setGeocoder}
        googleMapLatLng={googleMapLatLng}
        setGoogleMapLatLng={setGoogleMapLatLng}
        setValue={setValue}
        setIsGoogleMapInputValid={setIsGoogleMapInputValid}
        isNew={isNew}
      />
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={9}>
          <Textarea
            autoComplete="on"
            size="xl"
            fullWidth
            minRows={1}
            //@ts-ignore
            label={
              <>
                <FiPenTool /> Bribed What
              </>
            }
            placeholder="My Boss asked me for money for promotion!"
            initialValue={what}
            onChange={(e) => setWhat(e.target.value)}
          />
          <Spacer y={1.5} />
        </Grid>
        <Grid xs={12} sm={9}>
          <Input
            clearable
            autoComplete="on"
            size="md"
            fullWidth
            //@ts-ignore
            label={
              <>
                <CgOrganisation /> Bribed Character or Organization
              </>
            }
            placeholder="Example Company"
            initialValue={who}
            onChange={(e) => setWho(e.target.value)}
          />
          <Spacer y={0.5} />
        </Grid>
        <Grid xs={12} sm={9}>
          <BribeEditGoogleMapInput
            map={map}
            maps={maps}
            geocoder={geocoder}
            setGoogleMapLatLng={setGoogleMapLatLng}
            value={value}
            setValue={setValue}
            reset={reset}
            bindings={bindings}
            isGoogleMapInputValid={isGoogleMapInputValid}
            setIsGoogleMapInputValid={setIsGoogleMapInputValid}
          />
          <Spacer y={0.5} />
        </Grid>
        <Grid xs={12} sm={9}>
          <Input
            autoComplete="on"
            size="md"
            //@ts-ignore
            label={
              <>
                <BiTime /> When Bribed
              </>
            }
            initialValue={when}
            onChange={(e) => setWhen(e.target.value)}
            width="186px"
            type="date"
          />
          <Spacer y={0.5} />
        </Grid>
        <Grid xs={12} sm={9}>
          <Input
            clearable
            autoComplete="on"
            size="md"
            fullWidth
            //@ts-ignore
            label={
              <>
                <GiPresent /> Bribed Goods
              </>
            }
            placeholder="Money!"
            initialValue={goods}
            onChange={(e) => setGoods(e.target.value)}
          />
          <Spacer y={0.5} />
        </Grid>
        <Grid xs={12} sm={9} alignItems="flex-end">
          <Input
            autoComplete="on"
            size="md"
            //@ts-ignore
            label={
              <>
                <BiCoin /> How Much Bribed
              </>
            }
            placeholder="100"
            initialValue={howMuch}
            onChange={(e) => setHowMuch(e.target.value)}
            width="186px"
            type="number"
          />
          <Popover placement="bottom">
            <Popover.Trigger>
              <Button
                auto
                bordered
                css={{
                  color: "$gray500",
                  borderColor: "$gray200",
                  ml: "$5",
                }}
                ripple={false}
              >
                {howMuchIsoCode}
                <MdKeyboardArrowDown />
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <Text css={{ p: "$3 $10" }}>USD</Text>
              <Text css={{ p: "$3 $10" }}>EUR</Text>
            </Popover.Content>
          </Popover>
          <Spacer y={0.5} />
        </Grid>
        <Grid xs={12} sm={9}>
          <Textarea
            autoComplete="on"
            size="md"
            fullWidth
            minRows={4}
            //@ts-ignore
            label={
              <>
                <CgNotes /> Detail
              </>
            }
            placeholder="Some Notes"
            initialValue={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <Spacer y={0.5} />
        </Grid>
        <Grid xs={12} sm={9} justify="center">
          <NextLink href={cancelUrl()}>
            <Button color="error" flat size="xs">
              CANCEL
            </Button>
          </NextLink>
          <Spacer x={1} />
          <Button color="success" flat size="xs" onClick={submitData}>
            SAVE
          </Button>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default BribeEdit;

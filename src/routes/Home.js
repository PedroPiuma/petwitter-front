import {
  Box, Stack, Image, Text, useDisclosure, Modal,
  ModalOverlay, ModalContent, ModalBody, CircularProgress, useToast, useColorMode
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Petwitte from '../components/Petwitte'
import client from '../providers/client'
import pictureOfEnd from '../img/profilePictureWithoutBackground.png'
import plusCircleIcon from '../img/plusCircleIcon.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import PetwitteBox from '../components/PetwitteBox'
import PetwitteBoxMobile from '../components/PetwitteBoxMobile'

const Home = () => {
  const [twittes, setTwittes] = useState([])
  const [jump, setJump] = useState(0)
  const [refresh, setRefresh] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const { colorMode } = useColorMode()

  useEffect(() => {
    const request = async () => {
      try {
        const response = await client.get(`twitte?skip=${jump}&take=10`)
        if (response.data.length < 10) setHasMore(false)
        jump === 0 ? setTwittes(response.data) : setTwittes(twittes.concat(response.data))

      } catch (error) {
        toast({
          position: 'top',
          title: 'Falha na conexão com servidor.',
          description: error.message,
          status: 'error',
          duration: 10000,
          isClosable: true,
        })
      }
    }
    request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jump, refresh])

  const fetchData = () => setJump(jump + 10)

  return (
    <Stack spacing={0} borderRight={'1px solid #EEEEEE'}>
      <PetwitteBox setRefresh={setRefresh} onClose={onClose} setJump={setJump} />

      <InfiniteScroll dataLength={twittes.length} next={fetchData} hasMore={hasMore}
        loader={<CircularProgress isIndeterminate color='#00ACC1' display={'flex'} justifyContent={'center'} py={'16px'} />}
        endMessage={
          <Stack align={'center'} py='15px'>
            <Text fontWeight={'600'} fontSize='16px' color={colorMode === 'light' ? 'gray.700' : 'white'}>Ruf Ruf! Você já viu tudo!</Text>
            <Image src={pictureOfEnd} boxSize={'80px'} borderRadius='full' bgColor={'#99dee6'} />
          </Stack>}>
        <Box direction={'column'}>
          {
            twittes.map((elem, index) =>
              <Petwitte key={elem.id + Date.now().toString() + index} user_id={elem.user_id} createdAt={elem.createdAt} body={elem.body} />)
          }
        </Box>
      </InfiniteScroll>

      <Image display={['block', 'none']} src={plusCircleIcon} borderRadius='full' boxSize={'56px'} position={'fixed'} bottom={'24px'} right={'16px'} cursor={'pointer'} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent margin={0} height='100vh' borderRadius={0}><ModalBody padding={0}><PetwitteBoxMobile onClose={onClose} /></ModalBody></ModalContent>
      </Modal>

    </Stack>
  )
}

export default Home;

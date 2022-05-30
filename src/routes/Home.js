import { Box, Stack, Image, Textarea, Button, Text, Flex, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Petweet from '../components/Petweet'
import client from '../providers/client'
import profileDefault from '../img/profileDefault.png'
import plusCircleIcon from '../img/plusCircleIcon.png'

const Home = () => {
  const [twittes, setTwittes] = useState([])
  const [sending, setSending] = useState(false)
  const [petwitteLength, setPetwitteLength] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()

  useEffect(() => {
    try {
      const request = async () => {
        const response = await client.get(`twitte`)
        setTwittes(response.data.reverse())
      }
      request()
    } catch (error) {
      console.log(error)
    }
  }, [sending])

  const petwitte = () => {
    setSending(true)
    const petwitte = document.getElementById('petwitte')?.value
    const petwitteMobile = document.getElementById('petwitte-mobile')?.value
    const request = async () => {
      try {
        await client.post('/twitte', { body: petwitte ? petwitte : petwitteMobile })
        alert('Twitte feito com sucesso')
        document.getElementById('petwitte').value = ''
      } catch (error) {
        alert('Falha em petwittar')
        console.log(error)
      } finally {
        setSending(false)
        onClose()
      }
    }
    if (petwitte || petwitteMobile) request()
  }

  return (
    <Stack borderTop={'1px solid gray'} spacing={0} >

      <Stack direction={['column']} display={['none', 'flex']} p={['20px 16px 16px 16px']} borderBottom={'8px solid #EEEEEE'} borderRight={'1px solid #EEEEEE'}>

        <Flex>
          <Image src={profileDefault} borderRadius='full' boxSize={['48px', '40px']} />
          <Textarea id='petwitte' disabled={sending} border={'none'} resize={'none'} placeholder='O que está acontecendo?' maxLength="140" onChange={(event) => setPetwitteLength(event.target.value.length)} />
        </Flex>

        <Flex align={'center'} gap={'8px'} alignSelf='flex-end'>
          <Text color={'#828282'} fontSize={'14px'} lineHeight={'24px'}>{petwitteLength}/140</Text>
          <Button isLoading={sending} bg={colorMode === 'light' ? '#99dee6' : '#3e3e3e'} color={'white'} borderRadius='8px' size={'sm'} onClick={petwitte}>Petwittar</Button>
        </Flex>

      </Stack>

      <Box direction={'column'}>{twittes.reverse().map(elem => <Petweet key={elem.id} user_id={elem.user_id} createdAt={elem.createdAt} body={elem.body} />)}</Box>

      <Image display={['block', 'none']} src={plusCircleIcon} borderRadius='full' boxSize={'56px'} position={'fixed'} bottom={'24px'} right={'16px'} cursor={'pointer'} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent margin={0} height='100vh' borderRadius={0}>
          <ModalBody padding={0}>
            <Flex paddingLeft={'16px'} paddingRight={'8px'} align={'center'} justifyContent={'space-between'} alignSelf='flex-end' borderBottom={'1px solid #ebebeb'} height={'64px'}>
              <Button colorScheme='blue' mr={3} onClick={onClose} variant={'link'} fontWeight={300} fontSize='12px' lineHeight={'21px'} color='#424242'>Cancelar</Button>
              <Flex align={'center'} gap={'8px'}>
                <Text color={'#828282'} fontSize={'14px'} lineHeight={'24px'}>{petwitteLength}/140</Text>
                <Button isLoading={sending} bg='#99dee6' color={'white'} borderRadius='8px' size={'sm'} onClick={petwitte}>Petwittar</Button>
              </Flex>
            </Flex>
            <Flex mt={'6px'} paddingLeft={'16px'} paddingRight={'8px'}>
              <Image src={profileDefault} borderRadius='full' boxSize={'37px'} />
              <Textarea id='petwitte-mobile' rows={20} disabled={sending} border={'none'} resize={'none'} placeholder='O que está acontecendo?' maxLength="140" onChange={(event) => setPetwitteLength(event.target.value.length)} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

    </Stack>
  )
}

export default Home;

import { Box, Stack, Image, Textarea, Button, Text, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Petweet from '../components/Petweet'
import client from '../providers/client'
import profileDefault from '../img/profileDefault.png'

const Home = () => {
  const [twittes, setTwittes] = useState([])
  const [sending, setSending] = useState(false)
  const [petwitteLength, setPetwitteLength] = useState(0)

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
    const petwitte = document.getElementById('petwitte').value
    const request = async () => {
      try {
        await client.post('/twitte', { body: petwitte })
        alert('Twitte feito com sucesso')
        document.getElementById('petwitte').value = ''
      } catch (error) {
        alert('Falha em petwittar')
        console.log(error)
      } finally { setSending(false) }
    }
    if (petwitte) request()
  }

  return (
    <Stack borderTop={'1px solid gray'} spacing={0} >

      <Stack direction={'column'} p={['20px 16px 16px 16px']} borderBottom={'8px solid #EEEEEE'} borderRight={'1px solid #EEEEEE'}>

        <Flex>
          <Image src={profileDefault} borderRadius='full' boxSize={['48px', '40px']} />
          <Textarea id='petwitte' disabled={sending} border={'none'} resize={'none'} placeholder='O que está acontecendo?' maxLength="140" onChange={(event) => setPetwitteLength(event.target.value.length)} />
        </Flex>

        <Flex align={'center'} gap={'8px'} alignSelf='flex-end'>
          <Text color={'#828282'} fontSize={'14px'} lineHeight={'24px'}>{petwitteLength}/140</Text>
          <Button isLoading={sending} bg='#99dee6' color={'white'} borderRadius='8px' size={'sm'} onClick={petwitte}>Petwittar</Button>
        </Flex>

      </Stack>

      <Box direction={'column'}>{twittes.reverse().map(elem => <Petweet key={elem.id} user_id={elem.user_id} body={elem.body} />)}</Box>

    </Stack>
  )
}

export default Home;

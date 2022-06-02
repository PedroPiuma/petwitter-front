import client from '../providers/client'
import { Stack, Text, Image, Box, Modal, ModalOverlay, ModalContent, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import Petweet from '../components/Petweet'
import Username from '../components/Username'
import profileDefault from '../img/profileDefault.png'

const Profile = () => {
  let auth = useAuth()
  const { id } = auth.user
  const [profile, setProfile] = useState('')
  const [profilePicture, setProfilePicture] = useState(profileDefault)
  const [twittes, setTwittes] = useState([])
  const { user_id } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    try {
      const request = async (id) => {
        const response = await client.get(`twitte/${id}`)
        const { data } = await client.get(`users/${id}`)
        setTwittes(response.data)
        setProfile(data)
        if (profile?.image_url) setProfilePicture(process.env.REACT_APP_API_URL + '/' + profile.image_url)
      }
      user_id ? request(user_id) : request(id)
    } catch (error) {
      console.log('Falha na requisição do perfil')
    }
  }, [id, user_id, profile?.image_url])

  return (
    <Stack minW={'320px'} maxW={'683px'} spacing={0} width={'100%'} borderRight={'1px solid #EEEEEE'}>
      <Stack w={'100%'} p={['34px']} direction='row' align={'center'} gap={['34px']} position='relative'
        borderBottom={'1px solid #EEEEEE'} >
        <Image crossOrigin='anonymous' cursor={'zoom-in'} borderRadius='full' boxSize={['73px', '120px']} src={profilePicture} bgColor='#00ACC1' onClick={onOpen} />
        <Box>
          <Username name={profile.name} />
          <Text color={'#8e8e8e'}>{profile.username}</Text>
        </Box>
        <Text position={'absolute'} px={'8px'} bottom={0} borderBottom={'4px solid #00ACC1'}>Petposts</Text>
      </Stack>

      <Box direction={'column'}>{twittes.map(elem => <Petweet key={elem.id} body={elem.body} createdAt={elem.createdAt} user_id={user_id || id} />)}</Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent><Image crossOrigin='anonymous' src={profilePicture} cursor={'zoom-out'} onClick={onClose} /></ModalContent>
      </Modal>
    </Stack>
  )
}

export default Profile;

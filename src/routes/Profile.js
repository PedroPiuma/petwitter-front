import { Stack, Text, Image, Box, Modal, ModalOverlay, ModalContent, useDisclosure, } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Petweet from '../components/Petweet'
import { useAuth } from '../context/auth-context'
import profileDefault from '../img/profileDefault.png'
import client from '../providers/client'
import { useParams } from 'react-router-dom'

const Profile = () => {
  let auth = useAuth()
  const { id } = auth.user
  // const profilePicture = auth.user.image_url?.replaceAll("\\", '/')
  const [profile, setProfile] = useState('')
  const [profilePicture, setProfilePicture] = useState(profileDefault)
  const [twittes, setTwittes] = useState([])
  const pic = process.env.REACT_APP_API_URL + '/' + profilePicture
  const { user_id } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    try {
      const request = async (id) => {
        const response = await client.get(`twitte/${id}`)
        setTwittes(response.data)
        // const pictureResponse = await axios.get(pic)
        // console.log(pictureResponse.request.responseURL)
        // setProfile(pictureResponse)
        const { data } = await client.get(`users/${id}`)
        setProfile(data)
      }
      user_id ? request(user_id) : request(id)
    } catch (error) {
      console.log('Falha na requisição do perfil')
    }
  }, [id, pic, user_id])

  console.log(profile)

  return (
    <Stack minW={'320px'} maxW={'683px'} spacing={0} width={'100%'}>
      <Stack w={'100%'} p={['34px']} direction='row' align={'center'} gap={['34px']} position='relative'
        borderBottom={'1px solid #EEEEEE'} borderRight={'1px solid #EEEEEE'}>
        <Image cursor={'zoom-in'} borderRadius='full' boxSize={['73px', '120px']} src={profilePicture /*profile.request?.responseURL*/} bgColor='#00ACC1' onClick={onOpen} />
        {/* <a href={profile.request?.responseURL}>net::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200</a> */}
        <Box>
          <Text fontWeight={[700]} fontSize={['24px']} lineHeight={['33px']}>{profile.name}</Text>
          <Text color={'#8e8e8e'}>{profile.username}</Text>
        </Box>
        <Text position={'absolute'} px={'8px'} bottom={0} borderBottom={'4px solid #00ACC1'}>Petposts</Text>
      </Stack>

      <Box direction={'column'}>{twittes.map(elem => <Petweet key={elem.id} body={elem.body} user_id={user_id || id} />)}</Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent><Image src={profilePicture} cursor={'zoom-out'} onClick={onClose} /></ModalContent>
      </Modal>
    </Stack>
  )
}

export default Profile;

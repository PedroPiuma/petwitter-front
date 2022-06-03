import {
    Stack, Image, Text, Flex, UnorderedList, ListItem, useColorMode
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import profileDefault from '../img/profileDefault.png'
import client from '../providers/client'
import ReactTimeAgo from 'react-time-ago'
import { useLocation } from "react-router-dom"

const Petweet = ({ body, createdAt, user_id }) => {
    const [user, setUser] = useState([])
    const [userPicture, setUserPicutre] = useState(profileDefault)
    const { colorMode } = useColorMode()
    const location = useLocation()

    useEffect(() => {
        const request = async () => {
            try {
                const response = await client.get(`/users/${user_id}`)
                setUser(response.data)
                // if (user.image_url) setUserPicutre(process.env.REACT_APP_API_URL + '/' + user.image_url)
                if (user.image_url) setUserPicutre(user.image_url)
            } catch (error) { console.log(error) }
        }
        request()
    }, [user_id, user.image_url])

    return (
        <Stack direction={'row'} p={['20px 16px 16px 16px']} borderBottom={'1px solid #EEEEEE'}>
            <Image src={userPicture} borderRadius='full' boxSize={['48px', '40px']} />
            <Flex direction={'column'} gap={['4px', '9px']}>
                <Stack direction={'row'} align='center' gap={['4px']}>
                    <Link to={location.pathname === '/' ? `profile/${user_id}` : '#'}><Text color={colorMode === 'light' ? ['#7d7d7d', 'black'] : '#e2e2e2'} fontWeight={700} fontSize={['14px', '15px']} lineHeight={['19px', '20px']}>{user.name}</Text></Link>
                    <Text color={['#7d7d7d', '#828282']} fontWeight={[300, 400]} fontSize={['12px', '15px']} lineHeight={['17px', '20px']}>{user.username}</Text>
                    <UnorderedList ><ListItem ml={'15px'} color={'#757575'} fontWeight={300} fontSize={'12px'} lineHeight={'17px'}> <ReactTimeAgo date={Date.parse(createdAt)} locale="pt-BR" /></ListItem></UnorderedList>
                </Stack>
                <Text fontWeight={400} lineHeight={'18px'} color={colorMode === 'light' ? '#141619' : '#e2e2e2'}>{body}</Text>
            </Flex>
        </Stack>
    )
}

export default Petweet
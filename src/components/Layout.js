import {
  Text, Flex, Stack, Image, useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalCloseButton, ModalBody, Button, useMediaQuery, Drawer, DrawerOverlay, DrawerContent,
  DrawerBody, useColorMode, Icon
} from "@chakra-ui/react";
import { Link as ReachLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useRef } from "react";
import menuHamburguer from '../img/menu-hamburguer.png'
import logo from '../img/logo.png'
import profileDefault from '../img/profileDefault.png'
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { CgProfile } from 'react-icons/cg';
import { MdHome, MdPets } from 'react-icons/md';
import { BiExit } from 'react-icons/bi';

function Layout() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: modalIsOpen, onOpen: modalOnOpen, onClose: modalOnClose } = useDisclosure()
  const btnRef = useRef()
  const { signout } = useAuth()
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)')
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode()
  const { user } = useAuth()

  const closeAll = () => {
    onClose()
    modalOnClose()
  }

  return (
    <Flex direction={['column', 'row']} >
      <Modal isOpen={modalIsOpen} onClose={modalOnClose}>
        <ModalOverlay />
        <ModalContent mx={'10px'} maxW={'385px'}>
          <ModalCloseButton />
          <ModalBody>
            <Stack p={'16px'} bgColor={'white'} borderRadius={'8px'} backgroundColor={'none'}>
              <Text fontWeight={'600'} fontSize='24px' color={colorMode === 'dark' ? '#a8dcfa' : 'gray.700'}>Sair desta conta?</Text>
              <Text fontWeight={'400'} fontSize='16px' color={colorMode === 'dark' ? '#a8dcfa' : '#757575'}>Deseja realmente sair desta conta?</Text>
              <Flex justifyContent={'space-between'} gap={'12px'}>
                <Button colorScheme='twitter' variant='outline' w={['146px', '161px']} onClick={signout}>Sair</Button>
                <Button colorScheme='twitter' variant='solid' w={['146px', '161px']} onClick={closeAll}>Cancelar</Button>
              </Flex>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {!isLargerThan480 ?
        <Flex align={'center'} p={'16px'}>
          <Image src={menuHamburguer} cursor={'pointer'} h={'16px'} w={'24px'} mr={'84px'} onClick={onOpen} ref={btnRef} />
          <Image src={logo} h={'28px'} w={'116px'} cursor='none' />
          <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
              <Icon size={'32px'} position={'absolute'} top={'16px'} left={'18px'} as={colorMode === 'light' ? MoonIcon : SunIcon} w={5} h={5} cursor={'alias'} onClick={toggleColorMode} opacity={0.5} />
              <DrawerBody p={0}>
                <Flex direction='column' align={'center'} width={'100%'} mt={'36px'} gap={'16px'}>
                  <Image borderRadius='full' boxSize='56px' src={user?.image_url ? user.image_url : profileDefault} />
                  <Button width={'100%'} colorScheme='teal' variant='link' lineHeight={'24px'} py={'4px'}
                    borderRadius={0} bg={location.pathname === '/' ? (colorMode === 'light' ? '#e5f7f9' : '#3e3e3e') : ''} boxShadow={location.pathname === '/' ? 'inset 6px 0 0 #00ACC1' : ''}
                    as={ReachLink} to={'/'} onClick={onClose}>Home</Button>
                  <Button width={'100%'} colorScheme='teal' variant='link' lineHeight={'24px'} py={'4px'}
                    borderRadius={0} bg={location.pathname === '/profile' ? (colorMode === 'light' ? '#e5f7f9' : '#3e3e3e') : ''} boxShadow={location.pathname === '/profile' ? 'inset 6px 0 0 #00ACC1' : ''}
                    as={ReachLink} to="/profile" onClick={onClose}>Meu petfil</Button>
                  <Button width={'100%'} colorScheme='teal' variant='link' py={'4px'} borderRadius={0} _hover={{ backgroundColor: '#e5f7f9', boxShadow: 'inset 6px 0 0 #00ACC1' }}
                    onClick={modalOnOpen}><Icon as={BiExit} mr='11px' w={'20px'} h={'20px'} />Sair</Button>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
        :
        <Flex position={'relative'} direction={'column'} align={'center'} minH='100vh' width={'297px'} borderRight={'1px solid #EEEEEE'} pt={'24px'}>
          <Icon position={'absolute'} left={'8px'} top={'8px'} as={colorMode === 'light' ? MoonIcon : SunIcon} w={5} h={5} cursor={'alias'} onClick={toggleColorMode} opacity={0.5} />
          <Flex align={'center'} gap={'23px'}>
            <Icon as={MdPets} w={'54px'} h={'54px'} cursor='none' color={'#00ACC1'} p={'5px'} />
            <Text fontWeight={700} fontSize={'27px'} lineHeight={'40px'} color={'#00ACC1'}>PETWITTER</Text>
          </Flex>
          <Flex width={'100%'} direction='column' align={'flex-start'} >
            <Button pl={'70px'} justifyContent={'flex-start'} w={'100%'} colorScheme='teal' variant='link' py={'12px'} borderRadius={0} bg={location.pathname === '/' ? (colorMode === 'light' ? '#e5f7f9' : '#3e3e3e') : ''} boxShadow={location.pathname === '/' ? 'inset 6px 0 0 #00ACC1' : ''}
              as={ReachLink} to={'/'} ><Icon as={MdHome} mr='10px' w={'20px'} h={'20px'} />Home</Button>
            <Button pl={'70px'} justifyContent={'flex-start'} w={'100%'} colorScheme='teal' variant='link' py={'12px'} borderRadius={0} bg={location.pathname === '/profile' ? (colorMode === 'light' ? '#e5f7f9' : '#3e3e3e') : ''} boxShadow={location.pathname === '/profile' ? 'inset 6px 0 0 #00ACC1' : ''}
              as={ReachLink} to="/profile"><Icon as={CgProfile} mr='10px' w={'20px'} h={'20px'} />Meu petfil</Button>
            <Button pl={'70px'} justifyContent={'flex-start'} w={'100%'} colorScheme='teal' variant='link' py={'12px'} borderRadius={0} onClick={modalOnOpen}><Icon as={BiExit} mr='11px' w={'20px'} h={'20px'} />Sair</Button>
          </Flex>
        </Flex>}

      <Outlet />
    </Flex >
  );
}

export default Layout;

/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components/macro';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { QUERIES, WEIGHTS } from '../../constants';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';
import { animated, useSpring, useTransition } from '@react-spring/web'

const MobileMenu = ({ isOpen, onDismiss }) => {
  const transitions = useTransition(isOpen, {
    config: { duration: 150 },
    from: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: 0 },
    reset: !isOpen
  });

  return (
    <>
      {transitions((styles, item) => item &&
          <AnimatedDialogOverlay isOpen={isOpen} onDismiss={onDismiss} style={{ opacity: styles.opacity }}>
            <AnimatedDialogContent aria-label="Menu" style={{
              transform: styles.x.to(
                (value) => `translate3d(${value}%, 0px, 0px)`
              ),
            }}>
              <CloseButton onClick={onDismiss}>
                <Icon id="close"/>
                <VisuallyHidden>Dismiss menu</VisuallyHidden>
              </CloseButton>
              <Filler/>
              <Nav>
                <NavLink href="/sale">Sale</NavLink>
                <NavLink href="/new">New&nbsp;Releases</NavLink>
                <NavLink href="/men">Men</NavLink>
                <NavLink href="/women">Women</NavLink>
                <NavLink href="/kids">Kids</NavLink>
                <NavLink href="/collections">Collections</NavLink>
              </Nav>
              <Footer>
                <SubLink href="/terms">Terms and Conditions</SubLink>
                <SubLink href="/privacy">Privacy Policy</SubLink>
                <SubLink href="/contact">Contact Us</SubLink>
              </Footer>
            </AnimatedDialogContent>
          </AnimatedDialogOverlay>
        )}
    </>
  );
};

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-backdrop);
  display: flex;
  justify-content: flex-end;
`;
const AnimatedDialogOverlay = animated(Overlay);

const Content = styled(DialogContent)`
  background: white;
  width: 300px;
  height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
`;
const AnimatedDialogContent = animated(Content);

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
`;

export default MobileMenu;

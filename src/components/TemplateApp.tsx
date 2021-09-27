import { css } from "@linaria/core";
import type { ComponentChild, ComponentChildren } from "preact";

import IconMenu from "../assets/icons/menu.svg";
import Center from "./layouts/Center";
import Cluster from "./layouts/Cluster";
import Icon from "./layouts/Icon";
import Stack from "./layouts/Stack";

const styleHeader = css`
  padding: var(--s-1);
  & > h1 {
    font-size: 1.5rem;
    margin: 0;
    text-decoration: underline;
  }
`;

export type Props = {
  children: ComponentChildren;
  pageTitle: ComponentChild;
};

export default function TemplateApp({ children, pageTitle }: Props) {
  return (
    <Center>
      <Stack as="section">
        <Cluster as="header" className={styleHeader} justify="space-between">
          <h1>{pageTitle}</h1>
          <a className="align-self:center" href="#menu">
            <Icon label="menu">
              <img width="24" src={IconMenu} />
            </Icon>
          </a>
        </Cluster>
        <main>{children}</main>
      </Stack>
    </Center>
  );
}

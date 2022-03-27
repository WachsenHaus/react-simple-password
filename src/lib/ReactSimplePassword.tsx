import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const PasswordWrapped = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #020306b0;
  box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
`;

const Row = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NumberBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 10rem;
  font-size: 4rem;
  border: 1px solid #ffffff7d;
  text-shadow: 2px 1px 6px rgb(255, 255, 255);
  &:active {
    background: #ffffff22;

    filter: brightness(0.8);
  }
`;
const DeleteBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 10rem;
  font-size: 3rem;
  border: 1px solid #ffffff7d;
  &:active {
    background: #ffffff22;

    filter: brightness(0.8);
  }
`;
const PasswordTitleWrapped = styled.div`
  font-size: 4rem;
  height: 10rem;
`;
const PasswordCurrentWrapped = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
`;

const PasswordCircle = styled.div<{
  isActive: boolean;
  theme: 'BROWN' | 'BLUE';
}>`
  font-size: 4rem;
  width: 50px;
  height: 50px;
  margin: auto 3rem;

  border-radius: 50%;
  ${(props) => {
    switch (props.theme) {
      case 'BROWN':
        if (props.isActive) {
          return `background-color:  #413213;`;
        }
        return `background-color: gray;`;
      case 'BLUE':
        if (props.isActive) {
          return `background-color:  rgb(25,55,105);`;
        }
        return `background-color: gray;`;
      default:
        if (props.isActive) {
          return `background-color:  rgb(25,55,105);`;
        }
        return `background-color: gray;`;
    }
  }}
`;

const ReactSimplePassword = ({
  onFull,
  title,
  theme = 'BLUE',
}: {
  onFull: (e: string) => any;
  title: string;
  theme: 'BROWN' | 'BLUE';
}) => {
  const [numberArray, setNumberArray] = useState([
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '',
    '',
  ]);
  const [password, setPassword] = useState<Array<number>>([]);
  const missmatchCnt = useRef(0);
  const [passwordFlag, setPasswordFlag] = useState(false);
  /**
   * 피셔 예이츠 셔플을 이용한 배열 섞는 알고리즘/ 키패드를 랜덤으로 섞는다
   */
  useEffect(() => {
    const array = [...numberArray];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setNumberArray(array);
  }, []);

  const onNumberClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = e.target as HTMLElement;
    if (el) {
      if (password.length < 4) {
        const data = [...password];
        if (el.innerText === '') return;
        data.push(Number(el.innerText));
        setPassword(data);
      }
    }
  };

  /**
   * 패스워드가 4개입력되었다면 서버로부터 맞는 유저인지 fetchUserInfo를 통해 확인한다.
   */
  useEffect(() => {
    if (password.length === 4 && passwordFlag === false) {
      let pwd = '';

      //   btoa()
      //   const pwdBuffer = window.btoa(password.join(''));

      if (onFull) {
        setPassword([]);
        return onFull(password.join(''));
      }
    }
  }, [password, passwordFlag, onFull]);

  return (
    <PasswordWrapped>
      <Row>
        <PasswordTitleWrapped>{title}</PasswordTitleWrapped>
      </Row>
      <Row>
        <PasswordCurrentWrapped>
          <PasswordCircle theme={theme} isActive={password.length >= 1} />
          <PasswordCircle theme={theme} isActive={password.length >= 2} />
          <PasswordCircle theme={theme} isActive={password.length >= 3} />
          <PasswordCircle theme={theme} isActive={password.length >= 4} />
        </PasswordCurrentWrapped>
      </Row>
      <Row onClick={onNumberClick}>
        <NumberBox>{numberArray[0]}</NumberBox>
        <NumberBox>{numberArray[1]}</NumberBox>
        <NumberBox>{numberArray[2]}</NumberBox>
        <NumberBox>{numberArray[3]}</NumberBox>
      </Row>
      <Row onClick={onNumberClick}>
        <NumberBox>{numberArray[4]}</NumberBox>
        <NumberBox>{numberArray[5]}</NumberBox>
        <NumberBox>{numberArray[6]}</NumberBox>
        <NumberBox>{numberArray[7]}</NumberBox>
      </Row>
      <Row onClick={onNumberClick}>
        <NumberBox>{numberArray[8]}</NumberBox>
        <NumberBox>{numberArray[9]}</NumberBox>
        <NumberBox>{numberArray[10]}</NumberBox>
        <NumberBox>{numberArray[11]}</NumberBox>
      </Row>
      <Row>
        <DeleteBox
          onClick={() => {
            setPassword([]);
          }}
        >
          C
        </DeleteBox>
        <DeleteBox
          onClick={() => {
            const data = [...password];
            data.pop();
            setPassword(data);
          }}
        >
          ↩︎
        </DeleteBox>
      </Row>
    </PasswordWrapped>
  );
};
export default ReactSimplePassword;

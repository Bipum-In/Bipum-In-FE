import styled from 'styled-components';

export default function UserInfo({ userImage, deptName, empName, username }) {
  return (
    <UserInfoWrapper>
      <UserInfoTitle>신청자 정보</UserInfoTitle>
      <UserInfoContainer>
        <Img src={userImage} alt="userImage" />
        <UserInfoContent>
          <UserInfoDeptAndName>
            <DeptName>
              <span>부서</span>
              {deptName}
            </DeptName>
            <EmpName>
              <span>이름</span>
              {empName}
            </EmpName>
          </UserInfoDeptAndName>
          <UserName>
            <span>이메일</span>
            {username}
          </UserName>
        </UserInfoContent>
      </UserInfoContainer>
    </UserInfoWrapper>
  );
}

const UserInfoWrapper = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};
`;

const UserInfoTitle = styled.div`
  margin-bottom: 1.25rem;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8.25rem;
`;

const UserInfoContent = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: flex-start;
  width: 100%;
  height: 6rem;
  gap: 1rem;

  span {
    color: ${props => props.theme.color.grey.brandColor5};
    font-size: 13px;
  }
`;

const UserInfoDeptAndName = styled.div`
  ${props => props.theme.FlexRow};
  gap: 2rem;
`;

const DeptName = styled.div`
  ${props => props.theme.FlexCol};
  font-size: 15px;
  font-weight: 500;
  gap: 0.375rem;
`;

const EmpName = styled.div`
  ${props => props.theme.FlexCol};
  font-size: 15px;
  font-weight: 500;
  gap: 0.375rem;
`;

const UserName = styled.div`
  ${props => props.theme.FlexCol};
  font-size: 15px;
  font-weight: 500;
  gap: 0.375rem;
`;

const Img = styled.img`
  width: 8.25rem;
  height: 8.25rem;
  border-radius: 50%;
  margin-right: 2.25rem;
`;

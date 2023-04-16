import React from 'react';
import Button from 'elements/Button';
import STRING from 'constants/string';

export default function UserPutButton({
  requestType,
  editMode,
  acceptResult,
  handleEditToggle,
  editSupply,
  editReturn,
  editRepair,
  editReport,
}) {
  const editFunctions = {
    [STRING.REQUEST_NAME.SUPPLY]: editSupply,
    [STRING.REQUEST_NAME.RETURN]: editReturn,
    [STRING.REQUEST_NAME.REPAIR]: editRepair,
    [STRING.REQUEST_NAME.REPORT]: editReport,
  };

  const editFunction = editFunctions[requestType];

  return (
    <Button
      mainBtn={'fill'}
      onClick={editMode ? editFunction : handleEditToggle}
    >
      {editMode ? '저장' : '수정'}
    </Button>
  );
}

import SelectCategory from '../../common/SelectCategory';

export default function SelectCategoryList({
  category,
  optionName,
  optionNullName,
  optionKey,
  optionValueKey,
  onChangeCategory,
  disabled,
}) {
  return (
    <>
      <SelectCategory
        category={category[0]}
        optionName={optionName[0]}
        optionNullName={optionNullName[0]}
        optionKey={optionKey[0]}
        optionValueKey={optionValueKey[0]}
        onChangeCategory={onChangeCategory[0]}
        disabled={disabled}
      />
      <SelectCategory
        category={category[1]}
        optionName={optionName[1]}
        optionNullName={optionNullName[1]}
        optionKey={optionKey[1]}
        optionValueKey={optionValueKey[1]}
        onChangeCategory={onChangeCategory[1]}
        disabled={disabled}
      />
    </>
  );
}

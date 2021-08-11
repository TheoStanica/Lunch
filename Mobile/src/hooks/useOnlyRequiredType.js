import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const useOnlyRequiredType = ({type, menuId}) => {
  const [hasOnlyRequiredType, setHasOnlyRequiredType] = useState(false);
  const {menusById} = useSelector(state => state.menuReducer);

  useEffect(() => {
    let typeOnly = false;
    menusById[menuId].menu.forEach(menu => {
      if (menu.courses.every(course => course.requiredType === type)) {
        typeOnly = true;
        return;
      }
    });
    setHasOnlyRequiredType(typeOnly);
  }, [menuId, type]);

  return hasOnlyRequiredType;
};

export default useOnlyRequiredType;

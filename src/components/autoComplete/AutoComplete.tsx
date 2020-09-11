import React, { useState, useEffect, useRef, FC, ChangeEvent, KeyboardEvent, ReactElement } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../input/Input';
import Icon from '../icon/Icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../transition/Transition';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestiongs, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false);
  const [hightLightIndex, setHightLightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 500);
  const [showDropdown, setShowDropdown] = useState(false);
  useClickOutside(componentRef, () => {
    setSuggestions([])
  })
  useEffect(() => {
    //console.log('effect')
    if(debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        //console.log('Promise')
        setLoading(true);
        results.then(data => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        })
      } else {
        setSuggestions(results);
        setShowDropdown(true);
      }
    } else {
      setShowDropdown(false);
    }
    setHightLightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  const hightLight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestiongs.length) {
      index = suggestiongs.length - 1;
    }

    setHightLightIndex(index);
  }

  const handleKeyDonw = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if (suggestiongs[hightLightIndex]) {
          handleSelect(suggestiongs[hightLightIndex])
        }
        break;
      case 38://up
        hightLight(hightLightIndex - 1);
        break;
      case 40://down
        hightLight(hightLightIndex + 1);
        break;
      case 27://esc
      setShowDropdown(false);
        break;
      default:
        break;
    }
  } 

  const handleChnage = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  }
  
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  }

  const renderTemplate =(item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  }

  const generateDropDown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {setSuggestions([])}}
      >
      <ul className='suggestion-list'>
        {loading && <div className='suggstions-loading-icon'><Icon icon='spinner' spin /></div>}
        {!loading && suggestiongs.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': index === hightLightIndex
          })
          return (
            <li key={index} className={cnames} onClick={() => {handleSelect(item)}}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
      </Transition>
    )
  }

  return (
    <div className='auto-complete' ref={componentRef} >
      <Input 
        value={inputValue}
        onChange={handleChnage}
        onKeyDown={handleKeyDonw}
        {...restProps}
      />
      {generateDropDown()}
    </div>
  )
}



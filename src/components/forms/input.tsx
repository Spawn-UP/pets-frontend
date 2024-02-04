// falta a estilização do mesmo, aguardando UX/UI

// field = gerenciamento de estado do compoennte
// meta = gerenciamento de valores do compoenntes
// helpers = funçoes para setar valores do componente

import { KeyboardEvent, useState } from 'react';
import { useField } from 'formik';
import { mask as masker, unMask } from 'ts-remask';

import ClipLoader from 'react-spinners/ClipLoader';

import { IoIosClose } from 'react-icons/io';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const phone = ['(99) 9999-9999'];
const cellphone = ['(99) 9 9999-9999'];
const cpf = ['999.999.999-99'];
const cnpj = ['99.999.999/9999-99'];

const M = {
  plate: ['AAA-9999'],
  cep: ['99999-999'],
  cellphone,
  phone,
  phoneCellphone: [...phone, ...cellphone],
  cpf,
  cnpj,
  cpfCnpj: [...cpf, ...cnpj],
  date: ['99/99/9999'],
  shortDate: ['99/9999'],
  creditCard: ['9999 9999 9999 9999'],
  height: ['9.99'],
  cvv: ['999', '9999'],
};

export type TMask =
  | 'cep'
  | 'cellphone'
  | 'phone'
  | 'phoneCellphone'
  | 'plate'
  | 'cpf'
  | 'cnpj'
  | 'cpfCnpj'
  | 'date'
  | 'shortDate'
  | 'creditCard'
  | 'cvv'
  | 'height';

interface IInputProps {
  name: string;
  label?: string;
  isError?: string;
  placeholder?: string;
  required?: boolean;
  handleClean?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  mask?: TMask;
  autoComplete?: 'off' | 'on';
  type?: 'text' | 'number' | 'password' | 'email';
  transform?: 'capitalize' | 'lowercase' | 'uppercase';
}

export const Input = ({
  type,
  mask,
  required,
  handleClean,
  label,
  isLoading,
  readOnly,
  disabled,
  autoComplete,
  transform,
  placeholder,
  isError,
  ...rest
}: IInputProps) => {
  const [field, meta, helpers] = useField(rest);

  const [inputType, setInputType] = useState(type || 'text');

  const block = disabled || readOnly || isLoading;

  const handleClearInput = () => helpers.setValue('');

  const handleInputPassword = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    mask &&
      helpers.setValue(masker(unMask(event.currentTarget.value), M[mask]));
  };

  return (
    <div className="flex flex-col gap-2 ">
      <span>
        <label htmlFor={rest.name}>
          {label} {required && '*'}
        </label>
        {/* tooltip  */}
      </span>

      <div className="flex gap-2 items-center">
        <input
          className="rounded-lg bg-gray-50 text-black font-normal border-gray-300 border focus:border-white"
          type={inputType}
          id={rest.name}
          required={required}
          onKeyUp={onKeyUp}
          disabled={block}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onPaste={e => type === 'password' && e.preventDefault()}
          {...field}
        />

        {isLoading && <ClipLoader size={20} />}

        {!isLoading && handleClean && type !== 'password' && (
          <IoIosClose
            className="cursor-pointer"
            onClick={handleClearInput}
            size={20}
          />
        )}

        {!isLoading &&
          type === 'password' &&
          (inputType === 'password' ? (
            <FaRegEye
              className="cursor-pointer"
              onClick={() => handleInputPassword()}
              size={20}
            />
          ) : (
            <FaRegEyeSlash
              className="cursor-pointer"
              onClick={() => handleInputPassword()}
              size={20}
            />
          ))}
      </div>

      {isError ||
        (meta.touched && meta.error && (
          <p>{meta.error || 'Occorreu um erro'} </p>
        ))}
    </div>
  );
};

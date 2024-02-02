/* eslint-disable no-console */

'use client';

import { FormikProvider, useFormik } from 'formik';

import { Input } from 'components';
import { MouseEvent } from 'react';

const Main = () => {
  const submit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    values: { inputTest: string },
  ) => {
    e.preventDefault();

    console.log(values);
  };

  const form = useFormik({
    initialValues: {
      inputTest: '',
    },

    onSubmit: () => console.log(''),
  });

  return (
    <>
      <h1>MAIN PAGE</h1>
      <p>Site para doação de animais</p>

      <FormikProvider value={form}>
        <form>
          <Input
            name="inputTest"
            label="label"
            type="password"
            required
            handleClean
          />
          <button type="submit" onClick={e => submit(e, form.values)}>
            conosle.log
          </button>
        </form>
      </FormikProvider>
    </>
  );
};

export default Main;

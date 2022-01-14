import { FC, useState } from "react";

interface IContact {
  [key: number | string]: number | string,
  name: string,
  email: string,
  phoneNumber: string,
  id: number
}

interface FormAddNewContactProps {
  onSubmit: (name: string, email: string, phoneNumber: string, id: number) => void
}

const FormAddNewContact: FC<FormAddNewContactProps> = ({ onSubmit }) => {

  const [formFields, setFormFields] = useState<IContact>({
    name: '',
    email: '',
    phoneNumber: '',
    id: 0,
  });

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formFields.name, formFields.email, formFields.phoneNumber, Date.now());
    setFormFields({
      name: '',
      email: '',
      phoneNumber: '',
      id: 0,
    })
  }

  const onInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div>
      <h2 className="my-10 text-2xl">Add new contact</h2>
      <form onSubmit={submitForm} className="rounded overflow-hidden shadow-lg my-10 flex flex-col items-center">
        <input
          className="my-5 w-[300px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Name"
          name="name"
          value={formFields.name}
          onChange={onInputChange}
        />
        <input
          className="mb-5 w-[300px] shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
          name="email"
          value={formFields.email}
          onChange={onInputChange}
        />
        <input
          className="w-[300px] shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Phone number"
          name="phoneNumber"
          value={formFields.phoneNumber}
          onChange={onInputChange}
        />
        <input
          value='Добавить'
          className="bg-transparent my-10 mx-10 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          type="submit"
        />
      </form>
    </div>
  )
}

export default FormAddNewContact


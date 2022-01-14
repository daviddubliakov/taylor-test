import { FC, useState } from "react"

import FormAddNewContact from "./FormAddNewContact";

interface IContact {
  [key: number | string]: number | string,
  name: string,
  email: string,
  phoneNumber: string,
  id: number
}

const ListOfContacts: FC = () => {
  const [contacts, setContacts] = useState<Array<IContact>>([
    {
      name: 'Bohdan',
      email: 'qwe@email.com',
      phoneNumber: '+380111111111',
      id: 1
    },
    {
      name: 'David',
      email: 'qweqwe@email.com',
      phoneNumber: '+380321321321',
      id: 2
    },
    {
      name: 'Vasy',
      email: 'qweqweqwe@email.com',
      phoneNumber: '+380123123123',
      id: 3
    },
  ]);

  const [contactUpdate, setContactUpdate] = useState<IContact | null>(null);

  const saveContact = () => {
    const copyContacts = [...contacts];
    if (contactUpdate) {
      const contactUpdateIndex = copyContacts.findIndex(contract => contract.id === contactUpdate.id);
      copyContacts[contactUpdateIndex] = contactUpdate;

      setContactUpdate(null);
      setContacts(copyContacts);
    }
  }

  const deletContact = (id: number) => {
    const copyContacts: Array<IContact> = [...contacts];
    const deleteItemIndex = copyContacts.findIndex((contact: IContact) => contact.id === id);

    copyContacts.splice(deleteItemIndex, 1);

    setContacts(copyContacts);
  }

  const updateContactClick = (id: number) => {
    const newUpdateContact = contacts.find(contact => contact.id === id);

    if (newUpdateContact) {
      setContactUpdate(newUpdateContact);
    }
  }

  const changeValueInput = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>, i: number) => {
    if (contactUpdate) {
      setContactUpdate({ ...contactUpdate, [name]: value });
    }
  }

  const addNewContact = (name: string, email: string, phoneNumber: string, id: number) => {
    const copyContacts = [...contacts];

    if (name && email && phoneNumber) {
      const newContact = {
        name,
        email,
        phoneNumber,
        id
      };
      copyContacts.unshift(newContact)
      setContacts(copyContacts)
    }
  }

  console.log(contacts);

  return (
    <div className="grid place-content-center">
      <FormAddNewContact onSubmit={addNewContact} />
      <hr />
      <h2 className="my-10 text-2xl">My Contacts</h2>
      <ul>
        {contacts.map((contact: IContact, index: number) =>
          <li className="mb-10 rounded overflow-hidden shadow-lg box-content h-[350px] w-[550px] p-4" key={contact.id}>
            <div className="my-10">
              <p className="my-10 mx-20">
                Name:
                {(contactUpdate === null || contactUpdate.id !== contact.id) ? (
                  <span className="ml-3 py-2 px-3">{contact.name}</span>
                ) : (
                  <input
                    className="ml-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    onChange={(event) => changeValueInput(event, contact.id)}
                    value={contactUpdate.name}
                  />
                )
                }
              </p>
              <p className="my-10 mx-20">
                Email:
                {(contactUpdate === null || contactUpdate.id !== contact.id) ? (
                  <span className="ml-3 py-2 px-3">{contact.email}</span>
                ) : (
                  <input
                    className="ml-3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    onChange={(event) => changeValueInput(event, contact.id)}
                    value={contactUpdate.email}
                  />
                )
                }
              </p>
              <p className="my-10 mx-20">
                Phone number:
                {(contactUpdate === null || contactUpdate.id !== contact.id) ? (
                  <span className="ml-3 py-2 px-3">{contact.phoneNumber}</span>
                ) : (
                  <input
                    className="ml-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="phoneNumber"
                    onChange={(event) => changeValueInput(event, contact.id)}
                    value={contactUpdate.phoneNumber}
                  />
                )
                }
              </p>
            </div>
            <button
              className="bg-gray-300 ml-20 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={() => deletContact(contact.id)}
              disabled={contactUpdate !== null}
            >
              Delete
            </button>
            {(contactUpdate === null || contactUpdate.id !== contact.id) ? (
              <button
                className="bg-gray-300 ml-10 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                disabled={(contactUpdate !== null && contactUpdate.id !== contact.id)}
                onClick={() => updateContactClick(contact.id)}
              >
                Update
              </button>
            ) : (
              <button className="bg-gray-300 ml-10 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={saveContact}>
                Save
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  )
}

export default ListOfContacts;
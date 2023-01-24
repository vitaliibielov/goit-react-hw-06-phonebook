import styles from "./ContactList.module.css"
import { useSelector, useDispatch } from "react-redux"
import { removeContact, getContacts } from "../../redux/slices/contactsSlice"
import { getFilter } from "../../redux/slices/filterSlice"

export default function ContactList() {
	const contacts = useSelector(getContacts)
	const filter = useSelector(getFilter)
	const dispatch = useDispatch()
	const deleteContact = (id) => {
		return () => {
			dispatch(removeContact(id))
		}
	}

	const normalizeValue = (value) => value.toLowerCase().trim()
	const visibleContacts = contacts.filter((contact) => normalizeValue(contact.name).includes(normalizeValue(filter)))
	return (
		<>
			<ul className={styles.list}>
				{visibleContacts.map(({ id, name, number }) => (
					<li className={styles.item} key={id}>
            <div className={styles.contactTextBlock}>
              <p className={styles.contactText}>{name}</p>
              <p className={styles.contactText}>{number}</p>
            </div>
						<button className={styles.button} onClick={deleteContact(id)} type="button">
							Delete
						</button>
					</li>
				))}
			</ul>
		</>
	)
}
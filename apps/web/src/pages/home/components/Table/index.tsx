import React, { useEffect, useState } from 'react';
import { Button, Flex, Modal, Select, Table, Textarea, TextInput } from '@mantine/core';

import { useCreate, useRemove, useUpdate, VacancyType } from 'resources/vacancies/vacancies.api';

const VacancyTable = ({ data }: { data: VacancyType[] }) => {
  const [vacancies, setVacancies] = useState<Array<VacancyType>>([]);
  const [opened, setOpened] = useState(false);
  const [form, setForm] = useState<VacancyType>({
    _id: '',
    company: '',
    position: '',
    salaryRange: '',
    status: 'Submitted',
    note: '',
  });
  useEffect(() => {
    setVacancies(data);
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string>('');

  // const currentIdt = '674870fe5db4a7d8486157a4';
  const { mutate: createVacancy } = useCreate();
  const { mutate: updateVacancy } = useUpdate();
  const { mutate: removeVacancy } = useRemove();

  const resetForm = () => {
    setForm({ _id: '', company: '', position: '', salaryRange: '', status: 'Submitted', note: '' });
    setIsEditing(false);
    setOpened(false);
    setCurrentId('');
  };

  const handleAdd = () => {
    if (isEditing) {
      setVacancies(vacancies.map((vacancy) => (vacancy._id === currentId ? { ...vacancy, ...form } : vacancy)));
      updateVacancy({ id: form._id, data: { ...form } });
    } else {
      setVacancies([...vacancies, { ...form }]);
      createVacancy({ ...form });
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    setVacancies(vacancies.filter((vacancy) => vacancy._id !== id));
    removeVacancy(id);
  };

  const handleEdit = (vacancy: VacancyType) => {
    setForm(vacancy);
    setCurrentId(vacancy._id);
    setIsEditing(true);
    setOpened(true);
  };

  const rows = vacancies.map((el) => (
    <Table.Tr key={Math.random()}>
      <Table.Td>{el.company}</Table.Td>
      <Table.Td>{el.position}</Table.Td>
      <Table.Td>{el.salaryRange}</Table.Td>
      <Table.Td>{el.status}</Table.Td>
      <Table.Td>{el.note}</Table.Td>
      <Table.Td>
        <Button size="xs" onClick={() => handleEdit(el)} style={{ marginRight: '5px' }}>
          Edit
        </Button>
        <Button color="red" size="xs" onClick={() => handleDelete(el._id)}>
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Company</Table.Th>
            <Table.Th>Vacancy</Table.Th>
            <Table.Th>Salary range</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Notes</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Vacancy">
        <TextInput
          label="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        <TextInput
          label="Vacancy"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />
        <TextInput
          label="Salary Range"
          placeholder="Например, 1000-1500$"
          value={form.salaryRange}
          onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
        />
        <Select
          label="Status"
          data={[
            { value: 'Submitted', label: 'Submitted' },
            { value: 'Under Review', label: 'Under Review' },
            { value: 'Invitation', label: 'Invitation' },
            { value: 'Rejected', label: 'Rejected' },
          ]}
          value={form.status}
          onChange={(value) => setForm({ ...form, status: value || '' })}
        />
        <Textarea label="Note" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        <Button fullWidth mt="md" onClick={handleAdd}>
          Save
        </Button>
      </Modal>
      <Flex w="100%" align="center" justify="flex-end" my={20}>
        <Button radius="50%" style={{ width: 40, height: 40 }} p={0} onClick={() => setOpened(true)}>
          +
        </Button>
      </Flex>
    </>
  );
};

export default VacancyTable;

import {
  Button,
  Combobox,
  Divider,
  FileInput,
  Group,
  InputBase,
  Modal,
  Select,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";

export const ModalAddReport = (props: {
  shouldShowForm: boolean;
  toggleForm: () => void;
  setValue: React.Dispatch<React.SetStateAction<Date | null>>;
  value: Date | null;
}) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      bagian: "",
    },

    validate: {},
  });

  const personnels = ["Abel", "Budi", "Candra", "Dewi"];
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const shouldFilterOptions = personnels.every((item) => item !== search);
  const filteredOptions = shouldFilterOptions
    ? personnels.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
      )
    : personnels;
  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));
  return (
    <Modal
      opened={props.shouldShowForm}
      onClose={props.toggleForm}
      title="Form"
      centered
    >
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <DatePickerInput
          label="Tanggal"
          placeholder="Pick date"
          value={props.value}
          onChange={props.setValue}
        />
        <Select
          key={form.key("bagian")}
          label="Bagian"
          placeholder="Pilih bagian"
          data={["Teknis", "B", "C", "D"]}
          {...form.getInputProps("bagian")}
        />
        <Select
          label="Jenis Laporan"
          placeholder="Pilih jenih laporan"
          data={["A", "B", "C", "D"]}
        />
        {form.getValues().bagian === "Teknis" && (
          <Select
            label="Nama upi"
            placeholder="Pilih jenih laporan"
            data={["A", "B", "C", "D"]}
          />
        )}
        {form.getValues().bagian === "Teknis" && (
          <Select
            label="Ruang lingkup"
            placeholder="Pilih jenih laporan"
            data={["A", "B", "C", "D"]}
          />
        )}
        {form.getValues().bagian === "Teknis" && (
          <Select
            label="No HACCP"
            placeholder="Pilih jenih laporan"
            data={["A", "B", "C", "D"]}
          />
        )}
        <Combobox
          store={combobox}
          withinPortal={false}
          onOptionSubmit={(val) => {
            setValue(val);
            setSearch(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              label="Personil"
              rightSection={<Combobox.Chevron />}
              value={search}
              onChange={(event) => {
                combobox.openDropdown();
                combobox.updateSelectedOptionIndex();
                setSearch(event.currentTarget.value);
              }}
              onClick={() => combobox.openDropdown()}
              onFocus={() => combobox.openDropdown()}
              onBlur={() => {
                combobox.closeDropdown();
                setSearch(value || "");
              }}
              placeholder="Search value"
              rightSectionPointerEvents="none"
            />
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>
              {options.length > 0 ? (
                options
              ) : (
                <Combobox.Empty>Nothing found</Combobox.Empty>
              )}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
        <TextInput label="Laporan Output" placeholder="Input placeholder" />
        <FileInput label="Dokumentasi" placeholder="Unggah dokumentasi" />
        <Divider my="md" />
        <Group justify="flex-end">
          <Button
          // onClick={() => toggleForm()}
          >
            Batalkan
          </Button>
          <Button
          // onClick={() => toggleForm()}
          >
            Buat
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

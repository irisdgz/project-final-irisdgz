import styled from "styled-components";

export default function Filters({ value, onChange }) {
  const { city = "", category = "", onlyChangingTable = false } = value || {};

  function update(next) {
    onChange({ ...(value || {}), ...next });
  }

  return (
    <Wrap aria-label="Filters">
      <Field>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={city}
          onChange={(e) => update({ city: e.target.value })}
          placeholder="e.g. Solna"
          autoComplete="address-level2"
        />
      </Field>

      <Field>
        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
          value={category}
          onChange={(e) => update({ category: e.target.value })}
        >
          <option value="">All</option>
          <option value="mall">Mall</option>
          <option value="cafe">Cafe</option>
          <option value="restaurant">Restaurant</option>
          <option value="other">Other</option>
        </Select>
      </Field>

      <CheckRow>
        <Checkbox
          id="onlyChangingTable"
          type="checkbox"
          checked={onlyChangingTable}
          onChange={(e) => update({ onlyChangingTable: e.target.checked })}
        />
        <CheckLabel htmlFor="onlyChangingTable">
          Only show places with changing table
        </CheckLabel>
      </CheckRow>
    </Wrap>
  );
}

/* styled components */

const Wrap = styled.section`
  border: 1px solid #e7e7e7;
  border-radius: 16px;
  padding: 20px;
  display: grid;
  gap: 16px;
  background: white;
`;

const Field = styled.div`
  display: grid;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  color: #666;
`;

const Input = styled.input`
  border: 1px solid #e7e7e7;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #bbb;
  }
`;

const Select = styled.select`
  border: 1px solid #e7e7e7;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 15px;
  background: white;

  &:focus {
    outline: none;
    border-color: #bbb;
  }
`;

const CheckRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  background: #f7f7f7;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

const CheckLabel = styled.label`
  font-size: 14px;
  color: #111;
`;
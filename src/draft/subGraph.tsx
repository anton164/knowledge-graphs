{
  /* <FormControl fullWidth>
  <InputLabel>Sub graph</InputLabel>
  <Select
    value={item.subGraphId}
    onChange={event =>
      dispatchAction(
        updateNode({
          id: item.id,
          diff: {
            subGraphId: event.target.value as string | undefined,
          },
        })
      )
    }
  >
    <MenuItem>
      <em>None</em>
    </MenuItem>
    {graphs.map(({ name, id }) => (
      <MenuItem key={id} value={id}>
        {name}
      </MenuItem>
    ))}
  </Select>
</FormControl>; */
}

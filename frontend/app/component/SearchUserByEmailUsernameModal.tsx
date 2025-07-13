import {
  Box,
  CircularProgress,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import { useForm } from "react-hook-form";
import { CreateFriendSchema, ZCreateFriendSchema } from "../utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addUser,
  GetUserByUsernameSchema,
} from "../redux/slice/GetUserByUsername.slice";

const SearchUserByEmailUsernameModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { searchResults, isLoading } = useAppSelector(
    (state) => state.fetchingUser
  );
  const dispatch = useAppDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ZCreateFriendSchema>({
    resolver: zodResolver(CreateFriendSchema),
  });

  const onSubmit = (data: ZCreateFriendSchema) => {
    dispatch(GetUserByUsernameSchema(data));
  };

  const handleClick = (username: string, email: string) => {
    dispatch(addUser({ username, email }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          {...register("username")}
          label="Search"
          color="primary"
          size="small"
          type="text"
          placeholder="Search with username or email"
          fullWidth
          focused
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ""}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "action.active" }} />
                </InputAdornment>
              ),
            },
          }}
        />
        {isSubmitting && isLoading ? (
          <CircularProgress />
        ) : (
          <Stack spacing={2} sx={{ mt: 2 }}>
            {searchResults.map((item) => (
              <Box
                key={item.email}
                sx={{
                  border: 2,
                  borderColor: "primary.main",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="body1">{item.username}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.email}
                  </Typography>
                </Box>
                <AddIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleClick(item.username, item.email)}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default SearchUserByEmailUsernameModal;

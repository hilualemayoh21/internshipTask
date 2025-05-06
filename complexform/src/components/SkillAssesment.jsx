import React from 'react';
import {
  TextField,
  Typography,
  Box,
  MenuItem,
  OutlinedInput,
  InputLabel,
  FormControl,
  ListItemText,
  Checkbox,
  Select
} from '@mui/material';

const topics = [
  "UI/UX Design",
  "Graphic Design",
  "Interaction Design",
  "Design Thinking",
  "Product Design",
  "AccessibilityDesign",
  "Motion Design",
  "Mobile App Design",
  "Prototyping (Figma, Adobe XD)",
  "User Research & Testing"
];

const levels = ["Beginner", "Intermediate", "Advanced"];

function SkillAssessment({ formik }) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Box
      sx={{
        my: 2,
        px: 2,
        width: '100%',
       // center the box
        display: 'flex',
        flexDirection: 'column',
        gap: 2, // adds spacing between fields
      }}
    >
      <Typography variant="h5" gutterBottom>
        Skill Assessment
      </Typography>

      {/* Skill Level Select */}
      <TextField
        select
        fullWidth
        name="skillLevel"
        label="Skill Level"
        value={formik.values.skillLevel}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.skillLevel && Boolean(formik.errors.skillLevel)}
        helperText={formik.touched.skillLevel && formik.errors.skillLevel}
        sx={{ width: '100%' , flex:1 }}
      >
        {levels.map((level) => (
          <MenuItem key={level} value={level}>
            {level}
          </MenuItem>
        ))}
      </TextField>

      {/* Interested Topics Multi-select */}
      <FormControl
        fullWidth
        error={formik.touched.interestedTopics && Boolean(formik.errors.interestedTopics)}
      >
        <InputLabel id="topics-label">Interested Topics</InputLabel>
        <Select
          labelId="topics-label"
          id="interestedTopics"
          name="interestedTopics"
          multiple
          onBlur={() => formik.setFieldTouched("interestedTopics", true)}
          value={formik.values.interestedTopics}
          onChange={formik.handleChange}
          input={<OutlinedInput label="Interested Topics" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {topics.map((topic) => (
            <MenuItem key={topic} value={topic}>
              <Checkbox checked={formik.values.interestedTopics.includes(topic)} />
              <ListItemText primary={topic} />
            </MenuItem>
          ))}
        </Select>
        {formik.touched.interestedTopics && (
          <Typography variant="caption" color="error">
            {formik.errors.interestedTopics}
          </Typography>
        )}
      </FormControl>

      {/* Conditional Field: Portfolio Link */}
      {formik.values.skillLevel === "Advanced" && (
        <TextField
          fullWidth
          name="portfolioLink"
          label="Portfolio Link"
          value={formik.values.portfolioLink}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.portfolioLink && Boolean(formik.errors.portfolioLink)}
          helperText={formik.touched.portfolioLink && formik.errors.portfolioLink}
        />
      )}

      {/* Conditional Field: Mentorship Area */}
      {formik.values.skillLevel === "Beginner" && (
        <TextField
          fullWidth
          name="mentorshipArea"
          label="Preferred Mentorship Area"
          value={formik.values.mentorshipArea}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mentorshipArea && Boolean(formik.errors.mentorshipArea)}
          helperText={formik.touched.mentorshipArea && formik.errors.mentorshipArea}
        />
      )}
    </Box>
  );
}

export default SkillAssessment;

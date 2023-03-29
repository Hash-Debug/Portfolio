import Image from 'next/legacy/image';
import { useState } from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Divider,
  Button,
  Card,
  CardContent,
  IconButton,
  Avatar,
} from '@mui/material';

import ShortCenteredDivider from '../ui/ShortCenteredDivider';
import Link from '../Link';
import profilePicture from '../../public/profile-picture.jpeg';

import socialIcons from './constants/socialIcons';

interface ContactData {
  title: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  resumeLink: string;
  subtitle: string;
  formTitle: string;
  firstNameLabel: string;
  lastNameLabel: string;
  messageLabel: string;
  placeholder: string;
  submitButton: string;
  requiredErrorMessage: string;
}

interface ContactFormFields {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export default function Contact({
  contactData: t,
}: {
  contactData: ContactData;
}) {
  const [displayMessage, setDisplayMessage] = useState(false);
  const [senderFirstName, setSenderFirstName] = useState('');

  const initialValues: ContactFormFields = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t.requiredErrorMessage),
    lastName: Yup.string().required(t.requiredErrorMessage),
    email: Yup.string()
      .email("Invalid")
      .required(t.requiredErrorMessage),
  });

  const onSubmit = async (
    values: ContactFormFields,
    onSubmitProps: FormikHelpers<ContactFormFields>
  ) => {
    await fetch('/api/mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        message: values.message,
      }),
    });

    setSenderFirstName(values.firstName);
    onSubmitProps.resetForm();
    setDisplayMessage(true);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const { errors, touched, values, handleChange, handleSubmit, getFieldProps } =
    formik;

  return (
    <Box component="section" id="contact" sx={{ pb: 8, pt: 10 }}>
      <Container maxWidth="sm">
        <Typography gutterBottom align="center" component="h2" variant="h3">
          {t.title}
        </Typography>

        <ShortCenteredDivider sx={{ mb: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Avatar sx={{ width: 96, height: 96 }}>
            <Image
              alt="Hrithika R"
              height={160}
              placeholder="blur"
              src={profilePicture}
              width={160}
            />
          </Avatar>
        </Box>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography color="textSecondary" component="p" variant="body2">
              {t.p1}
              <Link href="/#portfolio">{t.p2}</Link>
              {t.p3}
              <Link href={t.resumeLink} rel="noopener" target="_blank">
                {t.p4}
              </Link>
              .
            </Typography>
          </CardContent>

          <Divider />

          <CardContent>
            <Typography
              gutterBottom
              align="center"
              color="textPrimary"
              component="p"
              variant="body1"
            >
              {t.subtitle}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {socialIcons.map((socialIcon) => (
                <IconButton
                  key={socialIcon.label}
                  aria-label={socialIcon.label}
                  component="a"
                  href={socialIcon.href}
                  rel="noopener"
                  size="large"
                  sx={{
                    fill: (theme) => theme.palette.common.white,
                    '&:hover': {
                      fill: (theme) => theme.palette.primary.main,
                    },
                    '&:focus': {
                      fill: (theme) => theme.palette.primary.main,
                    },
                  }}
                  target="_blank"
                >
                  {socialIcon.icon}
                </IconButton>
              ))}
            </Box>
          </CardContent>
        </Card>
        

       
      </Container>
    </Box>
  );
}

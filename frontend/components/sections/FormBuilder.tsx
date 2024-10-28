/*
To customize the styling for our forms, we recommend using separate SCSS files. This approach is particularly useful because the appearance of forms can vary based on the chosen inputs and configurations.

For each unique form, create a dedicated .scss stylesheet. The dynamic className assigned to the form can be used to access and apply specific styles, ensuring a more organised and maintainable approach to form styling.
*/

import {useFormspark} from '@formspark/use-formspark'
import {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {FormBuilderType} from '@/types'
import Image from 'next/image'
import ArrowButton from '@/svgs/ArrowButton'
import CheckMark from '@/svgs/CheckMark'
import urlForImage from '@/shared/utils/urlForImage'

interface InputFieldProps {
  type: string
  id: string
  fieldName?: string
  required?: boolean
  description?: string
  placeholder?: string
  register?: any
  formName?: string
}

const InputField = ({
  type,
  id,
  fieldName,
  required,
  description,
  placeholder,
  register,
  formName,
}: InputFieldProps) => (
  <div className={`${formName}-${type}`}>
    <label htmlFor={id}>{fieldName}</label>
    {description && <p>{description}</p>}
    <div>
      <input
        type={type}
        id={id}
        required={!!required}
        placeholder={placeholder}
        aria-describedby={type}
        {...register(id)}
      />
    </div>
  </div>
)

export default function FormBuilder(formBuilderData: FormBuilderType) {
  const {formFields, formId, formName, formImage, useCaptcha, captchaSiteKey} =
    formBuilderData ?? {}

  // UI states
  const [buttonHover, setButtonHover] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showCaptchaWarning, setShowCaptchaWarning] = useState(false)
  const [showFormFailed, setShowFormFailed] = useState(false)

  // Formspark hook
  const [submit, submitting] = useFormspark({
    formId: formId ? formId : '',
  })

  // Submission handler
  const {register, handleSubmit} = useForm()

  const onSubmit = async (data) => {
    const captchaElement = document.querySelector(
      '[name="h-captcha-response"]',
    ) as HTMLInputElement | null
    const captchaResponse = captchaElement?.value || ''
    if (!captchaResponse) {
      setShowCaptchaWarning(true)
      return
    }

    const submissionData = {
      ...data,
      'h-captcha-response': captchaResponse,
    }

    try {
      await submit(submissionData)
      setSubmitted(true)
      setShowCaptchaWarning(false)

      // Google Sheets API integration
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: submissionData}),
      })
      const result = await response.json()
      if (result.success) {
        console.log('Form submitted successfully')
      } else {
        console.error('Error submitting form:', result)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setShowFormFailed(true)
    }
  }

  // Load hCaptcha script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.hcaptcha.com/1/api.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const formNameFormatted = formName?.toLowerCase().replace(/\s/g, '-')

  return (
    <section className="formBuilder w-full flex justify-center bg-secondary-light-gray py-16">
      <div className="formBuilder-container fadeUp w-11/12 max-w-screen-xl flex shadow-sm">
        {/* Form */}
        {submitted ? (
          <div className="flex justify-center text-center w-11/12 min-h-[70vh] w-full items-center flex-col">
            <span className="w-12 h-12 mb-4 block">
              <CheckMark />
            </span>

            <h2 className="text-4xl font-bold text-primary-dark mb-2">
              Thank you for your submission!
            </h2>
            <p className="text-secondary-dark-gray">We will be in touch soon</p>
          </div>
        ) : showFormFailed ? (
          <div className="flex justify-center text-center w-11/12 min-h-[70vh] w-full items-center flex-col">
            <h2 className="text-4xl font-bold text-primary mb-2">
              There was a problem with the form submission.
            </h2>
            <p className="text-secondary-dark-gray font-bold">
              Please refresh the page and try again.
            </p>
            <p className="text-secondary-dark-gray">
              If the issue persists, contact us at{' '}
              <a className="underline" href="mailto:support@example.com">
                sales@inspiredwashrooms.co.uk
              </a>
              . Or call us at{' '}
              <a className="underline" href="tel:01156713867">
                0115 671 3867
              </a>
            </p>
          </div>
        ) : (
          <>
            {/* Image */}
            {formImage && (
              <div className="formBuilder-image relative h-full w-full hidden md:block md:w-1/3 lg:w-1/4 ">
                <Image
                  src={urlForImage(formImage)?.url() ?? ''}
                  alt="image"
                  className="object-cover"
                  fill={true}
                  sizes="33vw"
                />
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className={formNameFormatted}>
              {Array.isArray(formFields) &&
                formFields.map((field, key) => {
                  const {inputType, fieldId, description, placeholder, fieldName, required} =
                    field ?? {}
                  const {current} = fieldId ?? {}
                  if (!inputType || !current) return null

                  if (inputType === 'textArea') {
                    return (
                      <div className={`${formNameFormatted}-textarea`} key={key}>
                        <label htmlFor={current}>{fieldName}</label>
                        <div>
                          <textarea
                            id={current}
                            required={!!required}
                            placeholder={placeholder}
                            aria-describedby="textarea"
                            {...register(current)}
                          />
                        </div>
                      </div>
                    )
                  }

                  return (
                    <InputField
                      key={key}
                      type={inputType}
                      id={current}
                      fieldName={fieldName}
                      required={required}
                      description={description}
                      placeholder={placeholder}
                      register={register}
                      formName={formNameFormatted}
                    />
                  )
                })}

              <div className={`flex ${useCaptcha ? 'justify-between' : 'justify-end'}  w-full`}>
                {useCaptcha && <div className="h-captcha" data-sitekey={captchaSiteKey}></div>}

                <span className="flex flex-col">
                  <button
                    className="flex items-center p-1 w-auto border rounded-full  hover:bg-primary hover:text-white transition-all duration-500 ease-in-out"
                    type="submit"
                    disabled={submitting}
                    onMouseEnter={() => setButtonHover(true)}
                    onMouseLeave={() => setButtonHover(false)}
                  >
                    <p className="px-4">Send your enquiry</p>
                    {buttonHover ? (
                      <ArrowButton arrowColour="#009FE3" circleColour="white" />
                    ) : (
                      <ArrowButton />
                    )}
                  </button>

                  {showCaptchaWarning && (
                    <span className="text-red-500 text-sm text-right pt-1">
                      Please complete the hCaptcha
                    </span>
                  )}
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  )
}

/*
To customize the styling for our forms, we recommend using separate SCSS files. This approach is particularly useful because the appearance of forms can vary based on the chosen inputs and configurations.

For each unique form, create a dedicated .scss stylesheet. The dynamic className assigned to the form can be used to access and apply specific styles, ensuring a more organised and maintainable approach to form styling.
*/

import {useFormspark} from '@formspark/use-formspark'
import {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {FormBuilderType} from '@/types'
import Image from 'next/image'
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
  dropdownOptions?: string[]
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
    <label htmlFor={id} className="block text-primary text-xl font-medium mb-2">
      {fieldName}
    </label>
    {description && <p>{description}</p>}
    <div>
      <input
        type={type}
        id={id}
        required={!!required}
        placeholder={placeholder}
        aria-describedby={type}
        {...register(id)}
        className="border border-primary rounded-sm p-3 w-full focus:outline-none focus:border-blue-500"
      />
    </div>
  </div>
)

export default function FormBuilder(formBuilderData: FormBuilderType) {
  const {formFields, formId, formName, formImage, useCaptcha, captchaSiteKey} =
    formBuilderData ?? {}

  // UI states
  const [submitted, setSubmitted] = useState(false)
  const [showFormFailed, setShowFormFailed] = useState(false)
  const [showCaptchaWarning, setShowCaptchaWarning] = useState(false)

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
      // Submit the data to Formspark
      await submit(submissionData)
      setSubmitted(true)
      setShowCaptchaWarning(false)
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
    <section className="formBuilder flex justify-center py-16 px-5">
      <div className="formBuilder-container w-full max-w-screen-2xl flex bg-white rounded-lg gap-3">
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
                sales@nottinghamlightingcentre.co.uk
              </a>
              . Or call us at{' '}
              <a className="underline" href="tel:01156713867">
                0115 953 7088
              </a>
            </p>
          </div>
        ) : (
          <>
            {/* Image */}
            {formImage && (
              <div className="formBuilder-image relative hidden md:block md:w-1/3 lg:w-1/4 flex-1">
                <Image
                  src={urlForImage(formImage)?.url() ?? ''}
                  alt="Visit"
                  className="object-cover"
                  fill={true}
                  sizes="33vw"
                />
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full p-8 md:w-2/3 lg:w-3/4 flex-1">
              <h2 className="text-3xl text-gray-800 mb-4 uppercase text-primary">
                Arrange a Visit
              </h2>
              <p className="text-primary font-manrope font-bold mb-6">
                If you would like to arrange a concierge service, please fill out the form below and
                we’ll be in touch to confirm your appointment and answer any queries.
              </p>

              {/* Map over form fields */}
              <div className="grid grid-cols-2 gap-4">
                {Array.isArray(formFields) &&
                  formFields.map((field, key) => {
                    const {
                      inputType,
                      fieldId,
                      description,
                      placeholder,
                      fieldName,
                      required,
                      dropdownOptions,
                    } = field ?? {}
                    const {current} = fieldId ?? {}
                    if (!inputType || !current) return null

                    if (inputType === 'dropdown') {
                      return (
                        <div key={key} className="mb-6 col-span-2">
                          <label
                            htmlFor={current}
                            className="block text-primary text-xl font-medium mb-2"
                          >
                            {fieldName}
                          </label>
                          <select
                            id={current}
                            required={!!required}
                            className="w-full p-3 border border-primary rounded-sm focus:outline-none focus:border-blue-500"
                            {...register(current)}
                          >
                            <option value="" disabled>
                              Select an option
                            </option>
                            {dropdownOptions?.map((option: string, index: number) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )
                    }

                    if (inputType === 'textArea') {
                      return (
                        <div key={key} className="mb-6 col-span-2">
                          <label
                            htmlFor={current}
                            className="block text-primary text-xl font-medium mb-2"
                          >
                            {fieldName}
                          </label>
                          <textarea
                            id={current}
                            required={!!required}
                            placeholder={placeholder}
                            rows={5}
                            className="w-full p-3 border border-primary rounded-sm focus:outline-none focus:border-blue-500"
                            {...register(current)}
                          />
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
              </div>

              {/* Button and Captcha */}
              <div className={`flex ${useCaptcha ? 'justify-between' : 'justify-end'}  w-full`}>
                {useCaptcha && <div className="h-captcha" data-sitekey={captchaSiteKey}></div>}
                <div className="flex flex-col items-center mt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-12 py-2 bg-primary text-white font-semibold  hover:bg-secondary transition duration-300"
                  >
                    Submit
                  </button>

                  {showCaptchaWarning && (
                    <span className="text-red-500 text-sm text-right mt-3">
                      Please complete the hCaptcha
                    </span>
                  )}
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  )
}

"use client";

import FieldError from "@/components/shared/FieldError";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createDoctor, updateDoctor } from "@/services/admin/doctor";
import { IDoctor } from "@/types/doctor.interface";
import { ISpecilities } from "@/types/specialities";
import { useState } from "react";
import { toast } from "sonner";

interface IDoctorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  doctor?: IDoctor;
  specialities?: ISpecilities[];
}

const DoctorFormDialog = ({ open, onClose, onSuccess, doctor, specialities }: IDoctorFormDialogProps) => {
  const isEdit = !!doctor;

  // Loading state
  const [loading, setLoading] = useState(false);

  // Field states
  const [gender, setGender] = useState<"MALE" | "FEMALE">(doctor?.gender || "MALE");
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>(
    doctor?.doctorSpecialties?.[0]?.specialities?.title || ""
  );

  // Store API validation errors
  const [apiErrors, setApiErrors] = useState<{ field: string; message: string }[] | null>(null);

  // Handle form submit
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    // Append gender and speciality
    formData.set("gender", gender);
    formData.set("specialities", selectedSpeciality);

    try {
      let response;
      if (isEdit && doctor?.id) {
        response = await updateDoctor(doctor.id, null, formData);
      } else {
        response = await createDoctor(null, formData);
      }

      if (response.success) {
        toast.success(response.message || (isEdit ? "Doctor updated!" : "Doctor created!"));
        onSuccess();
        onClose();
        setApiErrors(null); // clear previous errors
      } else {
        setApiErrors(response.errors || []);
        toast.error(response.message || "Validation failed");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
        </DialogHeader>

        <form
          className="flex flex-col flex-1 min-h-0"
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            handleSubmit(data);
          }}
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Dr. John Doe"
                defaultValue={doctor?.name || ""}
              />
              <FieldError errors={apiErrors} field="name" />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="doctor@example.com"
                defaultValue={doctor?.email || ""}
                disabled={isEdit}
              />
              <FieldError errors={apiErrors} field="email" />
            </Field>

            {/* Password (only for create) */}
            {!isEdit && (
              <>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" placeholder="Enter password" />
                  <FieldError errors={apiErrors} field="password" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm password" />
                  <FieldError errors={apiErrors} field="confirmPassword" />
                </Field>
              </>
            )}

            {/* Speciality */}
            <Field>
              <FieldLabel htmlFor="specialities">Speciality</FieldLabel>
              <Input id="specialities" name="specialities" type="hidden" value={selectedSpeciality} />
              <Select value={selectedSpeciality} onValueChange={setSelectedSpeciality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a speciality" />
                </SelectTrigger>
                <SelectContent>
                  {specialities && specialities.length > 0 ? (
                    specialities.map((s) => (
                      <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>No specialities</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FieldError errors={apiErrors} field="specialities" />
            </Field>

            {/* Contact Number */}
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="+1234567890"
                defaultValue={doctor?.contactNumber || ""}
              />
              <FieldError errors={apiErrors} field="contactNumber" />
            </Field>

            {/* Address */}
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, City"
                defaultValue={doctor?.address || ""}
              />
              <FieldError errors={apiErrors} field="address" />
            </Field>

            {/* Registration Number */}
            <Field>
              <FieldLabel htmlFor="registrationNumber">Registration Number</FieldLabel>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                placeholder="REG123456"
                defaultValue={doctor?.registrationNumber || ""}
              />
              <FieldError errors={apiErrors} field="registrationNumber" />
            </Field>

            {/* Experience */}
            <Field>
              <FieldLabel htmlFor="experience">Experience (Years)</FieldLabel>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="5"
                defaultValue={doctor?.experience || 0}
                min="0"
              />
              <FieldError errors={apiErrors} field="experience" />
            </Field>

            {/* Gender */}
            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Input id="gender" name="gender" type="hidden" value={gender} />
              <Select value={gender} onValueChange={(v) => setGender(v as "MALE" | "FEMALE")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={apiErrors} field="gender" />
            </Field>

            {/* Appointment Fee */}
            <Field>
              <FieldLabel htmlFor="appointmentFee">Appointment Fee</FieldLabel>
              <Input
                id="appointmentFee"
                name="appointmentFee"
                type="number"
                placeholder="100"
                defaultValue={doctor?.appointmentFee || 0}
                min="0"
              />
              <FieldError errors={apiErrors} field="appointmentFee" />
            </Field>

            {/* Qualification */}
            <Field>
              <FieldLabel htmlFor="qualification">Qualification</FieldLabel>
              <Input
                id="qualification"
                name="qualification"
                placeholder="MBBS, MD"
                defaultValue={doctor?.qualification || ""}
              />
              <FieldError errors={apiErrors} field="qualification" />
            </Field>

            {/* Current Working Place */}
            <Field>
              <FieldLabel htmlFor="currentWorkingPlace">Current Working Place</FieldLabel>
              <Input
                id="currentWorkingPlace"
                name="currentWorkingPlace"
                placeholder="City Hospital"
                defaultValue={doctor?.currentWorkingPlace || ""}
              />
              <FieldError errors={apiErrors} field="currentWorkingPlace" />
            </Field>

            {/* Designation */}
            <Field>
              <FieldLabel htmlFor="designation">Designation</FieldLabel>
              <Input
                id="designation"
                name="designation"
                placeholder="Senior Consultant"
                defaultValue={doctor?.designation || ""}
              />
              <FieldError errors={apiErrors} field="designation" />
            </Field>

            {/* Profile Photo */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
                <Input id="file" name="file" type="file" accept="image/*" />
                <FieldError errors={apiErrors} field="file" />
              </Field>
            )}
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Doctor" : "Create Doctor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorFormDialog;

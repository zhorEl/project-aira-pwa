"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, User, MapPin, Sprout, FileCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Personal", icon: User },
  { id: 2, label: "Location", icon: MapPin },
  { id: 3, label: "Farm", icon: Sprout },
  { id: 4, label: "Review", icon: FileCheck },
];

export default function CreateFarmerPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Register Farmer"
        description="Add a new farmer to the registry. Records enter the validation queue after submission."
        breadcrumb={[{ label: "Farmers" }, { label: "Register" }]}
      />

      {/* Stepper */}
      <div className="mb-6 flex items-center">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const done = step > s.id;
          const active = step === s.id;
          return (
            <div key={s.id} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    done
                      ? "border-primary bg-primary text-primary-foreground"
                      : active
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                  )}
                >
                  {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={cn("text-xs font-medium", active || done ? "text-foreground" : "text-muted-foreground")}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("mx-2 h-0.5 flex-1 rounded", step > s.id ? "bg-primary" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>

      <Card>
        <CardContent className="pt-6">
          {step === 1 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="First name"><Input placeholder="Juan" /></Field>
              <Field label="Last name"><Input placeholder="Dela Cruz" /></Field>
              <Field label="Gender">
                <Select><option>Male</option><option>Female</option></Select>
              </Field>
              <Field label="Date of birth"><Input type="date" /></Field>
              <Field label="Phone"><Input placeholder="+63 9XX XXX XXXX" /></Field>
              <Field label="Email (optional)"><Input type="email" placeholder="farmer@email.com" /></Field>
            </div>
          )}
          {step === 2 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Municipality">
                <Select><option>Malaybalay</option><option>Valencia</option><option>Maramag</option><option>Lantapan</option></Select>
              </Field>
              <Field label="Barangay">
                <Select><option>Sumpong</option><option>Casisang</option><option>Aglayan</option></Select>
              </Field>
              <Field label="Cooperative">
                <Select><option>BHCG</option><option>KFC</option><option>MKCA</option></Select>
              </Field>
              <Field label="GPS coordinates"><Input placeholder="8.1500, 125.0500" /></Field>
              <div className="sm:col-span-2">
                <Field label="Address notes"><Textarea placeholder="Landmark, sitio, access notes…" /></Field>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Farm area (hectares)"><Input type="number" placeholder="2.5" /></Field>
              <Field label="Coffee variety">
                <Select><option>Arabica</option><option>Robusta</option><option>Excelsa</option><option>Liberica</option></Select>
              </Field>
              <Field label="Elevation (masl)"><Input type="number" placeholder="1200" /></Field>
              <Field label="Number of trees"><Input type="number" placeholder="2400" /></Field>
              <Field label="Est. annual production (kg)"><Input type="number" placeholder="1800" /></Field>
              <Field label="Certifications">
                <Select><option>None</option><option>Organic</option><option>Fair Trade</option></Select>
              </Field>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm">
                <p className="font-medium">Ready to submit</p>
                <p className="mt-1 text-muted-foreground">
                  This farmer record will be created and added to the verification queue for field-staff review.
                  GPS and polygon data can be captured later via the mobile app.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                {[
                  ["Name", "Juan Dela Cruz"],
                  ["Municipality", "Malaybalay"],
                  ["Cooperative", "BHCG"],
                  ["Variety", "Arabica"],
                  ["Area", "2.5 ha"],
                  ["Elevation", "1,200 masl"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">{k}</p>
                    <p className="font-medium">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
            <Button variant="ghost" onClick={() => (step === 1 ? router.push("/farmers") : setStep(step - 1))}>
              <ArrowLeft /> {step === 1 ? "Cancel" : "Back"}
            </Button>
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)}>
                Continue <ArrowRight />
              </Button>
            ) : (
              <Button onClick={() => router.push("/farmers")}>
                <Check /> Submit registration
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

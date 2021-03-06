import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TimeOffDoctorService } from 'src/app/services/time-off-doctor.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimeOffNurseService } from 'src/app/services/time-off-nurse.service';

@Component({
  selector: 'app-approve-request-for-holiday-or-time-off',
  templateUrl: './approve-request-for-holiday-or-time-off.component.html',
  styleUrls: ['./approve-request-for-holiday-or-time-off.component.css']
})
export class ApproveRequestForHolidayOrTimeOffComponent {

  constructor(
    public toastr: ToastrService,
    private timeOffDoctorService: TimeOffDoctorService, private timeOffNurseService: TimeOffNurseService,
    public dialogRef: MatDialogRef<ApproveRequestForHolidayOrTimeOffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  approve() {
    const request = this.data.requestForHolidayOrTimeOff;

    if (this.data.for === 'Doctor') {
      this.timeOffDoctorService.approve(request).subscribe(
        () => {
          this.dialogRef.close();
          this.toastr.success(
            'Request for holiday/time off is approved. Doctor will be notified.',
            'Approve request'
          );
          this.timeOffDoctorService.approveSuccessEmitter.next();

        },
        () => {
          this.dialogRef.close();
          this.toastr.error("Request for holiday/time off has  already been approved/rejected.", 'Approve request');
          this.timeOffDoctorService.approveSuccessEmitter.next();

        }
      )
    } else {
      this.timeOffNurseService.approve(request).subscribe(
        () => {
          this.dialogRef.close();
          this.toastr.success(
            'Request for holiday/time off is approved. Nurse will be notified.',
            'Approve request'
          );
          this.timeOffNurseService.approveSuccessEmitter.next();


        },
        () => {
          this.dialogRef.close();

          this.toastr.error("Request for holiday/time off has  already been  approved/rejected.", 'Approve request');
          this.timeOffNurseService.approveSuccessEmitter.next();
        }
      )
    }
  }




}
